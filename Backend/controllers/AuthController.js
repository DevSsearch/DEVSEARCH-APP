const User = require('../models/User')
const authHelper = require('../helpers/authHelper')
const bcrypt = require('bcrypt')
const validator = require('validator');

exports.userLogin = async (req,res) =>{
	let email = req.body.email
	let password = req.body.password

	if(!email || !password){
		return res.status(400).send({message:"Fill in all fields"})
	}

	/*check email and password for validity*/
	if(!validator.isEmail(email)){
		return res.status(400).send({message:"Invalid email"})
	}

	if(!validator.isLength(password,{min:6, max:30})){
		return res.status(400).send({message:"Password should at least be 6 characters long and not longer than 30 characters"})
	}

	try{
		let user = await User.findOne({email})
		
		if(!user){
			return res.status(404).send({message:"User does not exist."})
		}

		try{
			let match = await bcrypt.compare(password,user.password)

			/**/
			if(match){
				let payload ={
					id:user._id,
					email:user.email,
					name:user.name,
					avatar:user.avatar
				}

				let token = authHelper.encode(payload)
				console.log(token)

				return res.status(200).send({token})
			}

			return res.status(400).send({message:"Wrong password"})

		}catch(err){
			return res.status(500).end()
		}

	}catch(err){
		return res.status(500).end()
	}
}