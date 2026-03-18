const { User } = require('../models');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(`REGISTER ATTEMPT: Request URL: ${req.originalUrl}, Body Keys: ${Object.keys(req.body).join(', ')}`);

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      console.log(`REGISTER FAILED: User already exists - ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'HR',
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`LOGIN ATTEMPT: ${email}`);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`LOGIN FAILED: User not found - ${email}`);
    }

    if (user && user.password && (await comparePassword(password, user.password))) {
      console.log(`LOGIN SUCCESS: ${email}`);
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      const failReason = !user ? 'email' : (!user.password ? 'social_only' : 'password');
      console.log(`LOGIN FAILED: ${failReason} for ${email}`);
      const message = failReason === 'social_only' 
        ? 'This account uses social login. Please use Google to sign in.' 
        : 'Invalid email or password';
      res.status(401).json({ message });
    }
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

// OAuth Callbacks
const googleLogin = async (req, res) => {
  const token = generateToken(req.user.id);
  res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
};


module.exports = {
  register,
  login,
  getMe,
  googleLogin,
};
