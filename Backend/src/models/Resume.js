const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Resume = sequelize.define('Resume', {
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'upload_date',
  updatedAt: false,
});

module.exports = Resume;
