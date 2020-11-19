const express = require('express');
const router = express.Router();
const gravatar = require ('gravatar');
const bcrypt = require('bcryptjs');
const User = require('..models/user');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../config/keys');
const LoginValidation = require('../validation/login');

//@route    GET api/users
//@deets     GET users
//@access    Public 

router.get(
  '/',(req,res) => {res.send('user route');}
);
//@route    POST api/users/register
//@deets     Register user
//@access    Public 
router.post(
  '/register',(req,res) => {
   User.findOne({email:req.body.email})
    .then(user => {
      if(user) {
       res.status(400).json({email:'User already exists.Sign in'});
      }
      else {
///from: https://github.com/emerleite/node-gravatar //
    const avatar = gravatar.url(req.body.email,
        {
          s:'200',//size
          r:'pg',//rating
          d:'mm'
        }
      )//default;

        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          avatar
        });

       //from: https://www.npmjs.com/package/bcryptjs
       bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(newUser.password, salt, (err,hash) =>{
  
          if(err) throw err;
          newUser.password = hash;
       //storing hash in password DB
          newUser
           .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        });
       });
      }
  
    });
    });

//@route    POST api/users/login
//@deets     Login user
//@access    Public 
//login a user
router.post('/login',(req,res)=>{
  //validation
 const {errors, isValid} = LoginValidation(req.body);
 if (!isValid) {return res.status(400).json(errors);}
 ////
  if (req.body.email && req.body.password){
    const email = req.body.email
    const password = req.body.password
    User.getUserByEmail(email,(err,user)=>{
      if(!user){
        /*The email does not exist*/
        //from validation//
        errors.password ="The user does not exist!";
        res.status(404).json(errors);
        
      }else{
        /*Verify if the password is correct*/
        
        bcrypt.compare(password,user.password,(err,res)=>{  
          if (isMatch){
            /*Generate a valid unique login token*/
            const payload = {id:user.id, name:user.name,avatar:user.avatar}
            const token = jwt.sign(payload, secretOrKey,{expiresIn:'3600'})
            res.json({ message: 'ok', token });
          }else{
            /*Password is not valid for the specified user*/
            res.status(401).json({ password: 'The password is incorrect!'});
          }
        })  
      }
    })
  }
})

module.exports = router;