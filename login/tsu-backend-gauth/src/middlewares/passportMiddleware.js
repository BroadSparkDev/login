var passport = require('passport');
const config = require('../config');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use('google',new GoogleStrategy({
    clientID: config.oauth2.google.clientId,
    clientSecret: config.oauth2.google.clientSecret,
    callbackURL: config.oauth2.google.callbackUrl,
    scope:['profile','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

var TwitterStrategy = require('passport-twitter').Strategy;

passport.use('twitter',new TwitterStrategy({
  consumerKey: config.oauth2.twitter.apiKey,
  consumerSecret: config.oauth2.twitter.apiSecret,
  callbackURL: config.oauth2.twitter.callbackUrl
},
(token, tokenSecret, profile, cb) => {
  return cb(null, profile);
}));

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use('facebook',new FacebookStrategy({
  clientID: config.oauth2.facebook.clientID,
  clientSecret: config.oauth2.facebook.clientSecret,
  callbackURL: config.oauth2.facebook.callbackUrl
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile)}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport