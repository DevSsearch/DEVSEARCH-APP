///github-passsport jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../Models/User');
const keys = require('./keys');



const Opts = {};
Opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
/*I'll set this secret-key in the .env file that i'll create later on*/
Opts.secretOrKey = keys.secretOrkey;

module.exports = passport => {
passport.use(new JwtStrategy(Opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then (user => {
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);  
      }
     
  })
   .catch(err => console.log(err));
}));
}