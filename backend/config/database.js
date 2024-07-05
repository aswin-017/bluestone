const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bluestone_crm_db', 'root', 'Aswin@17', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
