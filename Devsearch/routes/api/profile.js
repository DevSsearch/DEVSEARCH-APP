const express = require('express');
const router = express.Router();
const Profile = require('../Models/Profile')
const passport = require('passport')
require('../auth/auth');

//@route    GET api/Profiles
//@deets    GET all profiles
//@access   Public


//@route    GET api/Profiles/:id
//@deets    GET Current users Profile
//@access   Public 
router.get('/:id',passport.authenticate('jwt', { session: false }), (req,res)=> {
  const errors = {};

  Profile.findOne({user: req.user.id}).
  then (profile => {
    if(!profile) {
      errors.noprofile = "there is no profile for this user";
      return res.status(404).json(errors);
    }
    else{
      res.json(profile);
    }

  })
  .catch(err => res.status(404).json(err));
})


//@route    POST api/Profiles
//@deets     Add new Profile
//@access    Private 
router.post('/',passport.authenticate('jwt', { session: false }),(req,res) => {
  const data = req.body
  Profile.create((data) , (err) =>{
    if(err){
      res.status(500).json({msg : "Err creating profile"})
    }else {
      res.status(201).json({msg : "Created"})
    }
  })
});

//@route    PUT api/Profiles/:id
//@deets     update Profile
//@access    Private
router.put( '/:id',passport.authenticate('jwt', { session: false }),(req,res) => {
  Profile.updateOne({_id : req.params.id}, (err)=>{
    if(err) {
      res.status(500).json({msg : "err"})
    }else {
      res.status(204).json({msg : "updated"})
    }
  })
});

//@route    DELETE api/Profiles/:id
//@deets     Delete Profile
//@access    Private
router.delete('/:id',passport.authenticate('jwt', { session: false }),(req,res) => {
   Profile.delete({_id : req.params.id} , (err)=>{
     if(err) {
       res.status(204).json({msg : "failed to delete"})
     }else {
       res.status(200).json({msg : "deleted"})
     }
   })
})

module.exports = router;