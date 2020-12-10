const express = require('express')
const app = express()
const connectDB = require('./config/db');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
	extended:true
}))

// Enable All CORS Requests
app.use(cors())

//Establishing a DB connection
connectDB()

//All routes will be registered/used here
app.use('/',routes)

app.listen(process.env.SERVER_PORT,function(){
	console.log('Port: '+process.env.SERVER_PORT)
})

module.exports = app;