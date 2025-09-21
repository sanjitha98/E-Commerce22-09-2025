const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || '7d'
  });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password,role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password,role: role||'user' });
    res.status(201).json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.profile = async (req, res) => {
  if(!req.user) return res.status(401).json({ message: 'Not authorized' });
  res.json({ user: req.user });
};
