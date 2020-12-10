const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

router.get('/',(req,res)=>{
	return res.send('<center><h1>Hello this is Dev Search</h1> <br></center>')
})

router.get('/api/users',UserController.getUsers)
router.get('/api/user_by_email/:token',UserController.getUserByEmail)
router.get('/api/user_by_name/:token',UserController.getUserByName)
router.post('/api/new_user',UserController.addUser)
router.post('/api/login',AuthController.userLogin)

module.exports = router;