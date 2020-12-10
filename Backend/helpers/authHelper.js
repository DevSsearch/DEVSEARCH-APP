const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.encode = (payload) => {
  let token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return token
}

exports.decode = (token) => {
  let decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}