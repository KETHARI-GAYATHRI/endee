const { Candidate, Skill, Resume, CandidateQuestion, MatchResult } = require('../models');

class CandidateRepository {
  async findAll() {
    return await Candidate.findAll({
      include: [
        { model: Skill, through: { attributes: [] } },
        { model: Resume },
        { model: MatchResult }
      ]
    });
  }

  async findById(id) {
    return await Candidate.findByPk(id, {
      include: [
        { model: Skill, through: { attributes: [] } },
        { model: Resume },
        { model: CandidateQuestion },
        { model: MatchResult }
      ]
    });
  }

  async findByKeywordsOrLocation(keywords = '', location = '') {
    const { Op } = require('sequelize');
    const kwArray = keywords ? keywords.toLowerCase().split(/[\s,;]+/).filter(k => k.length > 1) : [];
    
    const whereClause = { [Op.or]: [] };
    
    if (location) {
      whereClause[Op.or].push({ location: { [Op.like]: `%${location}%` } });
    }
    
    if (kwArray.length > 0) {
      // For skills matching, we use a separate include condition
    }

    // Build the query
    const queryOptions = {
      include: [
        { 
          model: Skill, 
          through: { attributes: [] },
          required: false // important: allow candidates without these specific skills if location matches
        },
        { model: Resume },
        { model: MatchResult }
      ]
    };

    if (kwArray.length > 0) {
      queryOptions.include[0].where = {
        name: { [Op.or]: kwArray.map(kw => ({ [Op.like]: `%${kw}%` })) }
      };
      // If we have keywords, we might want to ensure we find candidates with THESE skills 
      // OR candidates matching the location. Sequelize handles this best with a complex where.
    }

    if (location && kwArray.length === 0) {
      queryOptions.where = { location: { [Op.like]: `%${location}%` } };
    } else if (!location && kwArray.length > 0) {
      queryOptions.include[0].required = true;
    } else if (location && kwArray.length > 0) {
      // Match EITHER location OR skills
      queryOptions.where = {
        [Op.or]: [
          { location: { [Op.like]: `%${location}%` } },
          { '$Skills.name$': { [Op.or]: kwArray.map(kw => ({ [Op.like]: `%${kw}%` })) } }
        ]
      };
      // We need to use subQuery: false when using $nested.field$ in top-level where
      queryOptions.subQuery = false;
    }

    return await Candidate.findAll(queryOptions);
  }

  async create(data) {
    return await Candidate.create(data);
  }

  async updateStatus(id, status) {
    const candidate = await Candidate.findByPk(id);
    if (candidate) {
      candidate.status = status;
      await candidate.save();
      return candidate;
    }
    return null;
  }
}

module.exports = new CandidateRepository();
