const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserData = sequelize.define('UserData', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeTaken: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    correctMatches: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    incorrectAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = UserData;
