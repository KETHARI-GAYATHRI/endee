const { Candidate, Skill } = require('../models');
const { sequelize } = require('../config/db');

class AnalyticsService {
  async getSkillDistribution() {
    // Get count of candidates per skill
    const results = await sequelize.query(`
      SELECT s.name, COUNT(cs.candidate_id) as count
      FROM Skills s
      JOIN CandidateSkills cs ON s.id = cs.skill_id
      GROUP BY s.id
      ORDER BY count DESC
      LIMIT 10
    `, { type: sequelize.QueryTypes.SELECT });
    
    return results;
  }

  async getExperienceDistribution() {
    const candidates = await Candidate.findAll({ attributes: ['experience'] });
    
    const distribution = {
      'Fresher (0-1y)': 0,
      'Mid-level (2-5y)': 0,
      'Senior (5y+)': 0
    };

    candidates.forEach(c => {
      const exp = parseInt(c.experience) || 0;
      if (exp <= 1) distribution['Fresher (0-1y)']++;
      else if (exp <= 5) distribution['Mid-level (2-5y)']++;
      else distribution['Senior (5y+)']++;
    });

    return Object.entries(distribution).map(([label, value]) => ({ label, value }));
  }
}

module.exports = new AnalyticsService();
