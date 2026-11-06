const mongoose = require('mongoose');

const SiteSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', SiteSettingSchema);

