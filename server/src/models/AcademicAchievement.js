const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true }
}, { _id: false });

const AcademicAchievementSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['AL', 'OL', 'AAT', 'CA', 'UNIVERSITY', 'OTHER'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  completionYear: {
    type: String
  },
  zScore: {
    type: String
  },
  status: {
    type: String,
    default: 'Completed'
  },
  subjects: [SubjectSchema],
  documentName: {
    type: String
  },
  documentUrl: {
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

module.exports = mongoose.model('AcademicAchievement', AcademicAchievementSchema);

