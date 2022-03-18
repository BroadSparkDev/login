const db = require("../model");
const User = db.users;
const Signup = db.signup;
const bcrypt = require('bcrypt');
const nodemailer= require('nodemailer');
const config = require('../config');
const { getMaxListeners } = require("process");
const fs=require("fs");
const path=require("path");


exports.createUser = (user,res) => {
    const passwordHash = bcrypt.hashSync(user.password, 10);
     User.create({
      email: user.email,
      password: passwordHash,
      firstname: user.firstname,
      lastname: user.lastname,
      mobile: user.mobile,
      country: user.country
    })
      .then((user) => {
          res.json('user registered successfully')
       //console.log(">> Created user: " + JSON.stringify(user, null, 4));
        return user;
      })
      .catch((err) => {
       // console.log(">> Error while creating user: ", err);
        res.json({'error':err})
      });
  };

exports.createSignup = (signup,res) => {
  return Signup.create({
    email: signup.email,
    status: 'Pending'
  }).then(()=>{
  res.json(signup)
})
.catch( errors => {
  res.json({ errors: errors.errors });
});
};


exports.createMail = (random,emailExists,req,response) => {
  console.log(random)
  
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+random+"&&email="+emailExists.email;

    var transporter = nodemailer.createTransport({
    //service: 'gmail',
   host:config.transporter.host,
    auth: {
      user: config.transporter.auth.user,
      pass: config.transporter.auth.pass
    } ,
    tls:{
      rejectUnauthorized: false
    }
  });
  const filePath = path.join(__dirname, '../utils/email_templates/change_password.html');
  // console.log(filePath);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  // const template = handlebars.compile(source);
  const replacements = {
    username: "Umut YEREBAKMAZ"
  };
  // const htmlToSend = template(replacements);

  var mailOptions = {
    from: config.transporter.auth.user,
    to: emailExists.email,
    subject: 'Please confirm your Email account',
    // html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>",
    html : source
  };
  transporter
  .sendMail(mailOptions)
  .then(function(error,res) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      //console.log('Email sent:',res)
      response.json(mailOptions.subject);
    })
      Signup.findOne(
        { where: { email: emailExists.email } })
        .then((result) => {
          if(result){
        return result.update({random: random});
          }
        })
      if(emailExists.status=='Active')
        {
            res.end('mail already activated')
        }
 }



