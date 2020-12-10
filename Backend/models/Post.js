const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: Schema.Types.ObjectId,
  post: {
    type: String,
    required: 'Please write a post'
  }
},{timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
