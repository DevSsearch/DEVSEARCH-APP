const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

const db = process.env.ONLINE_MONGO_DB
/*
	Comment out if you're using a local mongo db,configure it via the .env
*/
//const db = process.env.DB_TYPE+'://'+process.env.HOST+':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DB_NAME

const connectDB = async () => {
	try{
		await mongoose.connect(db,{
			useFindAndModify : true,
      		useNewUrlParser : true,
      		useUnifiedTopology : true,
      		useCreateIndex : true
		})
		console.log("DB connected...")
	}catch(err){
		console.log(err)
	}	
}

module.exports = connectDB;
