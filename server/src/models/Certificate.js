const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuingOrganization: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  documentUrl: {
    type: String,
    default: ''
  },
  previewUrl: {
    type: String,
    default: ''
  },
  credentialId: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);

