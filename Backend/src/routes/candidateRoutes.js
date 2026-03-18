const express = require('express');
const router = express.Router();
const { 
  getAllCandidates, 
  getCandidateById, 
  updateCandidateStatus, 
  searchCandidates 
} = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllCandidates);
router.get('/search', protect, searchCandidates);
router.get('/:id', protect, getCandidateById);
router.patch('/:id/status', protect, updateCandidateStatus);

module.exports = router;
