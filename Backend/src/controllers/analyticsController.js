const analyticsService = require('../services/analyticsService');

const getDashboardStats = async (req, res) => {
  try {
    const skills = await analyticsService.getSkillDistribution();
    const experience = await analyticsService.getExperienceDistribution();
    
    res.json({
      skills,
      experience
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDashboardStats
};
