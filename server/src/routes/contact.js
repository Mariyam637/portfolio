const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact - Public contact submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Your message has been received.',
      id: newMessage._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

