const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// register
const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });

  try {
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered',
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// logout
const logout = (req, res) => {
  // If using stateless JWT, logout is handled client-side by removing token.
  // If using refresh tokens stored server-side, invalidate them here.
  res.status(200).json({ message: 'Logout successful' });
};

// return current user (requires protect middleware to attach req.user)
const getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' })
    const user = req.user
    res.status(200).json({ id: user.id, email: user.email, role: user.role })
  } catch (err) {
    console.error('getMe error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login, register, logout, getMe };