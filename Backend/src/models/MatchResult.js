const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MatchResult = sequelize.define('MatchResult', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  classification: {
    type: DataTypes.ENUM('Excellent Match', 'Good Match', 'Average', 'Rejected'),
    allowNull: false,
  },
  matched_skills: {
    type: DataTypes.TEXT, // JSON string
  },
  missing_skills: {
    type: DataTypes.TEXT, // JSON string
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = MatchResult;
