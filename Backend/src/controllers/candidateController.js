const candidateService = require('../services/candidateService');

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await candidateService.getCandidateById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateCandidateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const candidate = await candidateService.updateStatus(req.params.id, status);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchCandidates = async (req, res) => {
  const { q, l } = req.query;
  console.log('SEARCH PARAMS RECEIVED:', { q, l });
  
  if (!q && !l) {
    return res.status(400).json({ message: 'At least one search parameter (query or location) is required' });
  }
  try {
    const results = await candidateService.searchAndRank(q || '', l || '');
    res.json(results);
  } catch (error) {
    console.error('SEARCH ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  updateCandidateStatus,
  searchCandidates,
};
