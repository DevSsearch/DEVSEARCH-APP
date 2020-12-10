const User = require('../models/User')
const Profile = require('../models/Profile')
const authHelper = require('../helpers/authHelper')

/*
	Add a profile to the database
	URL /api/add_profile
	REQUEST POST request
	ACCESS Private
*/
exports.addProfile = async (req,res) => {
	let authHeader = req.headers['authorization']
	let token = authHeader && authHeader.split(' ')[1]

	if(!token){
		return res.status(400).send({message:'Token not provided'})
	}

	/*
		Check all the required parameters
		for profile
	*/
	decoded = authHelper.decode(token)
	
	if(!decoded){
		return res.status(400).send({message:'Invalid token'})
	}


	/*
		Populate all require variables
		Save an empty string for the non-required variables
		if they don't exist
	*/
	if(req.body.skills && req.body.experience.length !== 0 && req.body.education.length !== 0){
		let experience = []
		let education = []

		req.body.education.forEach(e => {
			if(e.title && e.company && e.from){
				/*
					Push content to the education array
				*/
			}else{
				return res.status(400).send({message:'Enter all required fields.'})
			}
		})

	}else{

	}
}

