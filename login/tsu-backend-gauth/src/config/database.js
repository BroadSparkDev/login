const { Sequelize }= require('sequelize');

const sequelize= new Sequelize('test-db','user','pass',{
    dialect: 'sqlite',
    host: './src/config/login.sqlite'
})

module.exports= sequelize;