const { Sequelize } = require('sequelize');
const DB_CONFIG = require('../config').db;

const sequelize = new Sequelize(DB_CONFIG.DATABASE, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: 'mysql'
});

module.exports = sequelize;
