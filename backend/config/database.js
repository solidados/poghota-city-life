const { Sequelize } = require('sequelize');

// Create SQLite database instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
