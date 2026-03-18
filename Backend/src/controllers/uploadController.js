const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const candidateService = require('../services/candidateService');
const { Skill, CandidateQuestion } = require('../models');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const uploadResume = async (req, res) => {
  console.log('UPLOAD REQUEST RECEIVED');
  try {
    if (!req.file) {
      console.log('UPLOAD ERROR: No file provided');
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    console.log('FILE PARSING START:', req.file.path);

    const fileName = req.file.originalname;
    const nameFromFile = fileName
      .replace(/\.(pdf|docx|doc|txt)$/i, '')
      .replace(/[_-]/g, ' ')
      .replace(/resume|cv|curriculum|vitae/gi, '')
      .trim();
    
    const candidateName = nameFromFile
      .split(' ')
      .filter(w => w.length > 0)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ') || 'Unknown Candidate';

    let resumeText = '';
    try {
      if (req.file.mimetype === 'application/pdf') {
        const data = await pdfParse(req.file.buffer);
        resumeText = data.text;
      } else {
        resumeText = req.file.buffer.toString('utf8');
      }
    } catch (parseError) {
      console.error('File Parse Error:', parseError);
      return res.status(422).json({ 
        success: false, 
        message: 'Could not extract text from file. Please ensure it is a valid document.' 
      });
    }

    const result = await candidateService.processResumeUpload(req.file, {
      name: candidateName,
      title: 'Full Stack Developer',
      experience: '2 years',
      education: 'B.Tech CS'
    }, resumeText);

    // AI already handled skills in service
    await CandidateQuestion.create({
      candidate_id: result.candidate.id,
      question: 'Tell us about your experience with React and Node.js.',
    });

    return res.status(201).json({
      success: true,
      message: 'Resume uploaded and evaluated',
      candidate: result.candidate,
      matchResult: result.matchResult
    });
  } catch (error) {
    console.error('Upload Error:', error);
    // Ensure we only send one response
    if (!res.headersSent) {
      return res.status(500).json({ 
        success: false,
        message: 'Server Error during resume upload',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }
};

const getUploadHistory = async (req, res) => {
  try {
    const { Resume, Candidate, MatchResult } = require('../models');
    const history = await Resume.findAll({
      include: [
        { model: Candidate, attributes: ['name', 'status', 'score'] },
        { model: MatchResult, attributes: ['score', 'classification'] }
      ],
      order: [['upload_date', 'DESC']]
    });

    const formattedHistory = history.map(h => ({
      id: h.id,
      name: h.Candidate?.name || 'Unknown',
      file: h.file_name,
      date: new Date(h.upload_date).toLocaleDateString(),
      status: h.Candidate?.status || 'none',
      score: h.Candidate?.score || 0,
      matchResult: h.MatchResult
    }));

    res.json(formattedHistory);
  } catch (error) {
    console.error('History Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Server Error fetching history' });
  }
};

module.exports = {
  upload,
  uploadResume,
  getUploadHistory,
};
