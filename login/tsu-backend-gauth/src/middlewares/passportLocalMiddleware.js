var passport1 = require('passport');
const config = require('../config');
const sequelize= require('../config/database');
const db = require("../model");

const User = db.users;
const Signup=db.signup;



const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt');

authUser = (user, password, done) => {
    console.log(`Value of "Email" in authUser function ----> ${user}`)         //passport1 will populate, user = req.body.username
    console.log(`Value of "Password" in authUser function ----> ${password}`) //passport1 will popuplate, password = req.body.password
    User.findOne({ 
        where : {Email:user}, 
        raw: true})
        .then( users => {  
bcrypt.compare(password, users.password, function(err, matches) {
    if (err)
      console.log('Error while checking password');
    else if (matches){
      console.log('The password matches!');
      let authenticated_user = { id: users.useruuid, email: users.email, password: users.password}     
     // let authenticated_user = { id: 123, Email: "Kyle@gmail.com"}
      return done (null, authenticated_user )
}
     else
      console.log('The password does NOT match!');
  });  
        
      })
 } 



passport1.use(new LocalStrategy (authUser))

passport1.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    //console.log(user)
    done(null, user)
})


passport1.deserializeUser((user, done) => {
        console.log("---------> Deserialize Id")
        //console.log(user.id)
        done (null, user)      
})



module.exports=passport1