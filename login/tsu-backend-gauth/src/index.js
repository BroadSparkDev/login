const morganMiddleware  = require('./middlewares/morganMiddleware');
const logger = require('./utils/logger')
const config = require('./config')
const express = require('express')
const passport  = require('./middlewares/passportMiddleware')
const app = express();
const tokenUtil = require('./utils/token')
const sequelize= require('./config/database');
const controller = require("./controllers/user.controller"); 
const db = require("./model");
const path = require('path');
const cors = require('cors');



app.set('config',config)
app.set('utils',{
  tokens: tokenUtil
})
app.use(cors({
  origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morganMiddleware)

app.use(require('express-session')({ secret: config.session.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())


routes = require('./routes')
app.use(routes)

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


sequelize.sync({forc:false}).then(() => console.log('database is ready'));


app.listen(config.service.port,()=>{
  logger.info("Server started listening on port ", config.service.port)
})

