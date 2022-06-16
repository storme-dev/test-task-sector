const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
});


module.exports = Token;
