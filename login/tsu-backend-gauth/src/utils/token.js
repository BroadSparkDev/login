jwt = require('jsonwebtoken')
config = require('../config')
module.exports.accessToken = (sub,scope)=>{
  return jwt.sign({issuer:config.jwt.issuer,
    audience:config.jwt.audience,
    expiresIn:config.jwt.expiresIn,
    subject:sub,scope:scope},
    config.jwt.secret)
}