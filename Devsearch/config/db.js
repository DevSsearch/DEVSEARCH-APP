const mongoose = require('mongoose');
const db = require('./keys').mongoURI;

const connectDB = async () => {
    await mongoose.connect(db, {
      useFindAndModify : true,
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useCreateIndex : true
	},(err => err ? console.log(err) : console.log("DB Connected...")));
}
  
module.exports = connectDB;