const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 25
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 200,
    default: 'Portfolio Inquiry'
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);

