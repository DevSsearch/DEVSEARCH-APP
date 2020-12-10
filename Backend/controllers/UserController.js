const User = require('../models/User')
const authHelper = require('../helpers/authHelper')
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

/*
	This controller is responsible for getting all the users data from the database
	This will require an admin and an admin authentication to access 
*/

//@route     			GET api/users/
//@short-description    GETs users
//@access    			Private
exports.getUsers = async (req,res) => {
	try{
		const users = await User.find()
		return res.status(200).send({users:users})
	}catch(err){
		return res.status(500).send({message:'Something went wrong with a users request'})
	}
}

/*
	Uses the payload from the jwt from the GET request
	decode it and access the email of the user via the payload
	that will be sent via a header
*/
//@route     			GET api/user_by_email
//@short-description    GETs user
//@access    			Private 
exports.getUserByEmail = (req,res) =>{
	let authHeader = req.headers['authorization']
	//let token = req.params.token
	let token = authHeader && authHeader.split(' ')[1]

	if(!token){
		return res.status(400).send({message:'Token not provided'})
	}
	
	decoded = authHelper.decode(token)
	
	if(decoded){
		User.findOne({email:decoded.payload.email},function(err,user){
			if(err){
				return res.status(500).end()			
			}

			if(user){
				return res.status(200).send({user:user})
			}else{
				return res.status(404).send({message:'User not found'})
			}	
		})
	}else{
		return res.status(400).send({message:'Invalid token'})
	}
}

/*
	Uses the payload from the jwt from the GET request
	decodes it and access the name of the user via the payload
	that will be sent via a header
*/
//@route     			GET api/user_by_name
//@short-description    GETs user
//@access    			Private 
exports.getUserByName = (req,res) =>{
	let authHeader = req.headers['authorization']
	//let token = req.params.token
	let token = authHeader && authHeader.split(' ')[1]

	if(!token){
		return res.status(400).send({message:'Token not provided'})
	}

	decoded = authHelper.decode(token)
	
	if(decoded){
		User.findOne({email:decoded.payload.name},function(err,user){
			if(err){
				return res.status(500).end()			
			}

			if(user){
				return res.status(200).send({user:user})
			}else{
				return res.status(404).send({message:'User not found'})
			}	
		})
	}else{
		return res.status(400).send({message:'Invalid token'})
	}
}

/*
	Gets the users name,email,and password then 
	if all the data that is required is valid we add 
	the new user
*/
//@route     			POST api/new_user
//@short-description    ADDs a new user
//@access    			Public 
exports.addUser = (req,res) => {
	let email = req.body.email
	let password = req.body.password
	let name = req.body.name

	if(email && password && name){

		User.findOne({$or:[{email},{name}]},function(err,user){
			if(err){
				console.log(err)
				return res.status(500).end()			
			}
			//onsole.log(user)
			if(user){
				return res.status(400).send({message:"This user already exists. Sign in."})
			}
			/*
				Add a new user
			*/
			const avatar = gravatar.url(req.body.email,
		        {
		          s:'200',//size
		          r:'pg',//rating
		          d:'mm'
		        }
  			)

  			/*
				Hash the password using the bcrypt algorithm
  			*/
  			bcrypt.hash(password,10,function(err,hashed){
  				if (err){
  					return res.status(500).end()		
  				}

  				/*
					Add to database
  				*/
  				const newUser = new User({
  					email,
  					name,
  					password:hashed,
  					avatar
  				})
  			
  				newUser.save(function(err,u){
  					if(err){
  						return res.status(500).end()		
  					}
  				})
  				return res.status(200).send({message:'New user added'})
  			})
		})
	}else{
		return res.status(400).send({message:"Fill in all the required fields"})
	}
}

/*
	Delete a user
*/
//@route     			DELETE api/delete_user
//@short-description    DELETE's a user
//@access    			Private 
exports.deleteUser = (req,res) =>{
	let authHeader = req.headers['authorization']
	//let token = req.params.token
	let token = authHeader && authHeader.split(' ')[1]

	if(!token){
		return res.status(400).send({message:'Token not provided'})
	}

	decoded = authHelper.decode(token)

	if(!decoded){
		return res.status(400).send({message:'Invalid token'})
	}

	let email = decoded.payload.email

	User.findOne({email},function(err,u){
		if(err){
			return res.status(500).end()
		}

		if(!u){
			return res.status(404).send({message:"User does not exist"})
		}

		User.deleteOne({email},function(err,u){
			if(err){
				return res.status(500).end()		
			}
		})

		return res.status(200).send({message:"User deleted"})
	})
}