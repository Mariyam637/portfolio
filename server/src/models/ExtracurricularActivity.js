const mongoose = require('mongoose');

const ExtracurricularActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    default: 'University of Kelaniya'
  },
  description: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    default: ''
  },
  date: {
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

module.exports = mongoose.model('ExtracurricularActivity', ExtracurricularActivitySchema);

