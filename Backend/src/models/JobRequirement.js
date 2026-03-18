const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const JobRequirement = sequelize.define('JobRequirement', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  required_skills: {
    type: DataTypes.TEXT, // Stored as comma-separated or JSON string
  },
  min_experience: DataTypes.INTEGER,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = JobRequirement;
