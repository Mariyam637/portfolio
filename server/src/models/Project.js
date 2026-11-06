const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectNumber: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Academic Project'
  },
  objective: {
    type: String,
    required: true
  },
  contribution: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  outcome: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  documentUrl: {
    type: String,
    default: ''
  },
  presentationUrl: {
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

module.exports = mongoose.model('Project', ProjectSchema);

