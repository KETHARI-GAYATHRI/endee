const express = require('express');
const router = express.Router();
const { register, login, getMe, googleLogin, microsoftLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const passport = require('passport');

router.post('/register', register);
router.post('/signup', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleLogin);


router.get('/me', protect, getMe);

module.exports = router;
