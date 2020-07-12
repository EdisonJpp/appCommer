const sequelize = require('sequelize');
const database = require('../config/DTB');

module.exports = database.define('seguidores', {
    userId: {
        type: sequelize.STRING,
        reference: {
            model: 'users',
            key: 'id',
        }
    },
    seguidoresId : {
        type : sequelize.INTEGER,
        references:{
            model:'users',
            key: 'id'
        }
    }
});