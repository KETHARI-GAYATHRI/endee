const express = require('express');
const router = express.Router();
const { upload, uploadResume, getUploadHistory } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/upload-history', protect, getUploadHistory);

module.exports = router;
