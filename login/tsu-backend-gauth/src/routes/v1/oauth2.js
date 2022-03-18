router = require('express').Router()
passport = require('../../middlewares/passportMiddleware')
passport1= require('../../middlewares/passportLocalMiddleware')

const config = require('../../config');
const sequelize= require('../../config/database');
const db = require("../../model");

var jwt = require('jwt-simple');

const controller = require("../../controllers/user.controller"); 

const User = db.users;
const Signup=db.signup;



router.post('/authorize',(req,res)=>{
  res.send('/oauth2/authorize')
})

router.get('/token',(req,res)=>{
  res.send('GET /oauth2/token')
})

router.get('/google',passport.authenticate('google', { scope: ['profile','email']} ))
router.get('/google/response',passport.authenticate('google',{failureRedirect:'/login',failureMessage:true}),(req,res)=>{
  access_token = req.app.get('utils').tokens.accessToken(req.user._json.sub,'user')
  res.json({
    access_token:access_token,
    expires_at: 3600
  })
})

router.get('/twitter',passport.authenticate('twitter'))
router.get('/twitter/response',passport.authenticate('twitter',{failureRedirect:'/login',failureMessage:true}),(req,res)=>{
  console.log(req.user)
  access_token = req.app.get('utils').tokens.accessToken(req.user._json.id,'user')
  res.json({
    access_token:access_token,
    expires_at: 3600
  })
})


router.get('/facebook',passport.authenticate('facebook',{ scope:[ 'public_profile', 'email']}))
router.get('/facebook/response',passport.authenticate('facebook',{failureRedirect:'/login',failureMessage:true}),(req,res)=>{
  console.log(req.user)
  access_token = req.app.get('utils').tokens.accessToken(req.user._json.sub,'user')
  res.json({
    access_token:access_token,
    expires_at: 3600
  })
})


router.get("/login", (req, res) => {
  res.render("login.ejs")
})

router.post ("/login", passport1.authenticate('local', {
  successRedirect: "/dashboard",
  failureRedirect: "/login"}),
)

router.get("/dashboard", (req, res) => {   
  res.render("dashboard.ejs", {email: req.user.email})
  //res.json({Email: req.user.Email})
})



router.post('/signup',async (req,res) => {
  await controller.createSignup(req.body,res);
})

router.post('/Email',async (req,res)=>{
 var rand=Math.floor((Math.random() * 100) + 54);
  const emailExists = await Signup.findOne({ where: { email: req.body.email } });     
  if (emailExists&&emailExists.status=='Pending') 
         {

              controller.createMail(rand,emailExists,req,res)
         }     
})

router.get('/verify',async function(req,res){
  //console.log(req.protocol+"://"+req.get('host'));
  //console.log("http://"+req.get('host'))
  let rand=await Signup.findOne({attributes: ['random'], where: { email: req.query.email } })
  console.log(rand.dataValues.random)
   if((req.protocol+"://"+req.get('host'))==("http://"+req.get('host')))
  {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand.dataValues.random)
      {
          console.log("email is verified");
          res.end("<h1>Email "+req.query.email+" is been Successfully verified");
          Signup.findOne({status: 'Pending'},
          { where: { email: rand.dataValues.email } })
          .then((result) => {
            if(result){
          return result.update({status: 'Active'});
            }
        })
      }
      else
      {
          console.log("email is already verified");
          res.end("<h1>email is already verified Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  } 
  });

router.post('/profile',async (req,res) => {
  let emailExists=await Signup.findOne({where:{email:req.body.email}})
  if(emailExists&& emailExists.status=='Active')
  await controller.createUser(req.body,res);
  else
  res.end("email not found.. please signup and verify first")
})


router.post('/passwordreset', async function (req, res) {
  if (req.body.email !== undefined) {
      var emailAddress = req.body.email;

  let emailExists=await User.findOne({where:{email:req.body.email}})
      var payload = {
          id: emailExists.dataValues.useruuid,        
          email: emailExists.dataValues.email
      };
       var secret = emailExists.dataValues.password 
     
      var token = jwt.encode(payload, secret);
     
  res.send('<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>');
  } else {
      res.send('Email address is missing.');
  }
});


router.get('/resetpassword/:id/:token', async function(req, res) {
  var user= await User.findOne({where:{useruuid:req.params.id}})

var secret = user.dataValues.password 
   var payload = jwt.decode(req.params.token, secret);

   res.send('<form action="/resetpassword" method="POST">' +
      '<input type="hidden" name="id" value="' + payload.id + '" />' +
      '<input type="hidden" name="token" value="' + req.params.token + '" />' +
      '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
      '<input type="submit" value="Reset Password" />' +
  '</form>'); 
});
 

router.post('/resetpassword', async function(req, res) {
  console.log(req.body.password)
  var user= await User.findOne({where:{useruuid:req.body.id}})
  
  var secret = user.dataValues.password 
  
  var payload = jwt.decode(req.body.token, secret);

  User.findOne({attributes:['password']},{where:{email:req.body.email}})
  .then((result)=>{
      if(result)
      result.update({password:req.body.password})
  }) 
 
  res.send('Your password has been successfully changed.');
});



module.exports=router