const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/auth');
const { upload, mirrorFileToClient } = require('../middleware/upload');
const Document = require('../models/Document');

// POST /api/upload - Protected single file upload
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded or file rejected by validator.' });
    }

    const filename = req.file.filename;
    mirrorFileToClient(filename);

    const fileUrl = `/uploads/${filename}`;
    const category = req.body.category || 'other';
    const documentName = req.body.name || req.file.originalname;

    const doc = await Document.create({
      name: documentName,
      category,
      fileUrl,
      originalFilename: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    res.status(201).json({
      success: true,
      fileUrl,
      document: doc
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/upload/documents - List all documents
router.get('/documents', protect, async (req, res) => {
  try {
    const docs = await Document.find().sort({ uploadedAt: -1 });
    res.json({ success: true, documents: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/upload/documents/:id - Delete document and local file
router.delete('/documents/:id', protect, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Attempt to remove file from disk
    const filename = path.basename(doc.fileUrl);
    const serverPath = path.join(__dirname, '../../public/uploads', filename);
    const clientPath = path.join(__dirname, '../../../client/public/uploads', filename);

    if (fs.existsSync(serverPath)) fs.unlinkSync(serverPath);
    if (fs.existsSync(clientPath)) fs.unlinkSync(clientPath);

    await Document.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Document removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

