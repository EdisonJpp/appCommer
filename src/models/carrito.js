const sequelize = require('sequelize'); 
const database = require('../config/DTB'); 

module.exports =  database.define( 'carritos',{
    userId :{
        type : sequelize.INTEGER,
        references:{
            model : 'users',
            key : 'id',
        }
    },
    publicationId : {
        type : sequelize.INTEGER, 
        references:{
            model : 'publications',
            key : 'id',
        }
    },
});