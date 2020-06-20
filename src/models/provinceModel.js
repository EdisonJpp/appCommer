const sequelize = require('sequelize');
const database = require('../config/DTB');

module.exports  = database.define('provinces', {
    province_name : {type  : sequelize.STRING}
});