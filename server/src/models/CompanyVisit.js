const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const CompanyVisitSchema = new mongoose.Schema({
  visitNumber: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  purpose: {
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
  keyLearning: {
    type: String,
    required: true
  },
  gallery: [GalleryItemSchema],
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

module.exports = mongoose.model('CompanyVisit', CompanyVisitSchema);

