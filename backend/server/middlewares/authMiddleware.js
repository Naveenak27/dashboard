const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header

  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.id; // Attach user ID to request object
    next();
  });
};
