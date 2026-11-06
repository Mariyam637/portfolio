const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  requirePasswordChange: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  lastLogin: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

