const sequelize = require('sequelize');
const database = require('../config/DTB') 
module.exports = database.define('users', {
    name:{
       type : sequelize.STRING,
    } ,
    lastname:{
        type: sequelize.STRING,
    }, 
    username:{
        type :  sequelize.STRING
    } ,
    password :{
        type :sequelize.STRING
    } ,
    gender : {
        type :sequelize.STRING
    } ,
    phonenumber :{
        type :sequelize.STRING
    } ,
    emai : {
        type :sequelize.STRING,
    },
    province_id : {
        type :sequelize.INTEGER ,
        references: {
            model: 'provinces',
            key: 'id',
          }
    } 
});

