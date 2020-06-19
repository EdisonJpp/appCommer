const sequelize = require('sequelize');
const database = require('../config/DTB');

const province = database.define('provinces', {
    province_name : {type  : sequelize.STRING}
});
module.exports = province ;