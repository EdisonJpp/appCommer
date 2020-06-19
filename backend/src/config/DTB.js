const sequelize = require('sequelize');
module.exports  = new sequelize('COMMERCE', 'sa', 'Edisonjp00254', {
    host : 'localhost',
    port : '1433',
        dialect: 'mssql',
        dialectOptions: {
          options: {
            useUTC: true,
            dateFirst: 1
          }
        },
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
});