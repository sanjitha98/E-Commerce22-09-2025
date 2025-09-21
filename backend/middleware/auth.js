const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  if (token.startsWith('Bearer ')) token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin resource. Access denied.' });
};
