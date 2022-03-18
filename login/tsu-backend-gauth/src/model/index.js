const { Sequelize }= require('sequelize');
const sequelize= require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

db.signup = require("./signup.model.js")(sequelize, Sequelize);


module.exports = db;