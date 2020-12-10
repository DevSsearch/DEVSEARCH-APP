const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref:'User'
	},
	post:{
		type: Schema.Types.ObjectId,
		ref:'Post'
	},
	comment:{
		type:String,
		required:'Please write a comment'
	}
},{timestamps:true})

module.exports = mongoose.model('Comment',CommentSchema);
