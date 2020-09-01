const sequelize = require('sequelize');
module.exports  = new sequelize(
  // 'DB_A635CF_tobuy',
  'DB_A66654_tobuy1',
  'DB_A66654_tobuy1_admin', 'edisonjp00254', {
    // host : 'sql5050.site4now.net',
    host : 'sql5063.site4now.net',
    // port : '1433',
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