const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // Check Authorization header or Cookie
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    for (let c of cookies) {
      const [name, val] = c.trim().split('=');
      if (name === 'token') {
        token = decodeURIComponent(val);
        break;
      }
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'riyas_nifran_executive_portfolio_jwt_secret_key_2026');
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = { protect };

