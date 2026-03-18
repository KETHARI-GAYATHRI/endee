const User = require('./User');
const Candidate = require('./Candidate');
const Resume = require('./Resume');
const Skill = require('./Skill');
const JobRequirement = require('./JobRequirement');
const MatchResult = require('./MatchResult');
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

// Define Relationships
Candidate.hasMany(Resume, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
Resume.belongsTo(Candidate, { foreignKey: 'candidate_id' });

Candidate.belongsToMany(Skill, { through: 'CandidateSkills', foreignKey: 'candidate_id', timestamps: false });
Skill.belongsToMany(Candidate, { through: 'CandidateSkills', foreignKey: 'skill_id', timestamps: false });

const CandidateQuestion = sequelize.define('CandidateQuestion', {
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Candidate.hasMany(CandidateQuestion, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
CandidateQuestion.belongsTo(Candidate, { foreignKey: 'candidate_id' });

Candidate.hasMany(MatchResult, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
MatchResult.belongsTo(Candidate, { foreignKey: 'candidate_id' });

Resume.hasOne(MatchResult, { foreignKey: 'resume_id', onDelete: 'CASCADE' });
MatchResult.belongsTo(Resume, { foreignKey: 'resume_id' });

module.exports = {
  User,
  Candidate,
  Resume,
  Skill,
  CandidateQuestion,
  JobRequirement,
  MatchResult,
};
