const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

//Mongo Connnection
connectDB();

//middleware
app.use(express.json());
//cross orgin resource sharing
app.use(cors());

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

-
//Defining routes///
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/postss'));

//i route
app.get('/', (req,res) => res.json({"msg": "Welcome team"}));

//listen 
app.listen(port, (err) => err ? console.log(err) : console.log(`Server running on ${port}`));