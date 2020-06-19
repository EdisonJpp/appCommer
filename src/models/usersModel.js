const sequelize = require('sequelize');
const database = require('../config/DTB') 
const users = database.define('users', {
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
        // primaryKey: true
    },
    province_id : {
        type :sequelize.INTEGER ,
        references: {
            model: 'provinces',
            key: 'id',
          }
    } 
});
module.exports = users ; 

