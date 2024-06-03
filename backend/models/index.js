const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require('mysql2');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Todo = require('./todo')(sequelize, DataTypes);

module.exports = db;