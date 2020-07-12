const database = require('../config/DTB');
const sequelize = require('sequelize');
module.exports = database.define('publications', {
    title:{
        type : sequelize.STRING
    },
    condition:{
        type: sequelize.STRING
    },
    price:{
        type : sequelize.INTEGER
    },
    description:{
        type: sequelize.STRING
    },
    image_name:{
        type: sequelize.STRING
    },
    wasPublishedAt:{
        type: sequelize.STRING
    },
    users_id:{
        type: sequelize.INTEGER,
        references:{
            model: 'users',
            key : 'id'
        }
    },
    categoryId:{
        type: sequelize.INTEGER,
        references:{
            model: 'categories',
            key: 'id'
        },
    },
});