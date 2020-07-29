const sequelize = require('sequelize'); 
const database = require('../config/DTB'); 

module.exports =  database.define( 'rateUser',{
    userId :{
        type : sequelize.INTEGER,
        references:{
            model : 'users',
            key : 'id',
        }
    },
    qualifierId : {
        type : sequelize.INTEGER,
        references:{
            model : 'users',
            key : 'id',
        },
    },
    qualification : {
        type : sequelize.STRING,
    },
    commentary : {
        type : sequelize.TEXT, 
    },
});