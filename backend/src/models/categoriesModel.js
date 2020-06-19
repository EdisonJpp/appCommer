const sequelize = require('sequelize');
const database = require('../config/DTB');

module.exports = database.define('categories', {
    categorie_name : {type  : sequelize.STRING},
});