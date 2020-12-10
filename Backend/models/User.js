const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate:{
      validator:validator.isEmail,
      message: 'Invalid Email Address'
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar:String
},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);

/*
module.exports.getUserByEmail = (email,callback ) => {
	const query = { email };
	User.findOne(query, callback);
}
*/
