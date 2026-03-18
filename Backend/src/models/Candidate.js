const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Candidate = sequelize.define('Candidate', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  location: DataTypes.STRING,
  experience: DataTypes.STRING,
  education: DataTypes.STRING,
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  summary: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('none', 'shortlisted', 'rejected', 'review', 'pending'),
    defaultValue: 'none',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Candidate;
