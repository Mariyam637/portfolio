const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['result', 'certificate', 'project', 'cv', 'activity', 'other'],
    default: 'other'
  },
  fileUrl: {
    type: String,
    required: true
  },
  originalFilename: {
    type: String
  },
  fileSize: {
    type: Number
  },
  mimeType: {
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);

