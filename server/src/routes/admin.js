const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const Profile = require('../models/Profile');
const AcademicAchievement = require('../models/AcademicAchievement');
const Project = require('../models/Project');
const CompanyVisit = require('../models/CompanyVisit');
const ExtracurricularActivity = require('../models/ExtracurricularActivity');
const Event = require('../models/Event');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Reflection = require('../models/Reflection');
const ContactMessage = require('../models/ContactMessage');
const Document = require('../models/Document');
const SiteSetting = require('../models/SiteSetting');

// Apply protection to all admin routes
router.use(protect);

// =================== DASHBOARD STATS ===================
router.get('/overview', async (req, res) => {
  try {
    const [
      totalMessages,
      unreadMessages,
      totalDocuments,
      totalProjects,
      totalVisits,
      totalActivities,
      totalEvents,
      totalCertificates,
      recentMessages
    ] = await Promise.all([
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      Document.countDocuments(),
      Project.countDocuments(),
      CompanyVisit.countDocuments(),
      ExtracurricularActivity.countDocuments(),
      Event.countDocuments(),
      Certificate.countDocuments(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      success: true,
      stats: {
        totalMessages,
        unreadMessages,
        totalDocuments,
        totalProjects,
        totalVisits,
        totalActivities,
        totalEvents,
        totalCertificates
      },
      recentMessages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =================== PROFILE ===================
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== ACADEMIC ACHIEVEMENTS ===================
router.get('/academics', async (req, res) => {
  try {
    const items = await AcademicAchievement.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/academics', async (req, res) => {
  try {
    const item = await AcademicAchievement.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/academics/:id', async (req, res) => {
  try {
    const item = await AcademicAchievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/academics/:id', async (req, res) => {
  try {
    const item = await AcademicAchievement.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== PROJECTS ===================
router.get('/projects', async (req, res) => {
  try {
    const items = await Project.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const item = await Project.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== COMPANY VISITS ===================
router.get('/company-visits', async (req, res) => {
  try {
    const items = await CompanyVisit.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/company-visits', async (req, res) => {
  try {
    const item = await CompanyVisit.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/company-visits/:id', async (req, res) => {
  try {
    const item = await CompanyVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Company visit not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/company-visits/:id', async (req, res) => {
  try {
    const item = await CompanyVisit.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Company visit not found' });
    res.json({ success: true, message: 'Company visit deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== ACTIVITIES ===================
router.get('/activities', async (req, res) => {
  try {
    const items = await ExtracurricularActivity.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const item = await ExtracurricularActivity.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const item = await ExtracurricularActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Activity not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const item = await ExtracurricularActivity.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Activity not found' });
    res.json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== EVENTS & WORKSHOPS ===================
router.get('/events', async (req, res) => {
  try {
    const items = await Event.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/events', async (req, res) => {
  try {
    const item = await Event.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const item = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    const item = await Event.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== SKILLS ===================
router.get('/skills', async (req, res) => {
  try {
    const items = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/skills', async (req, res) => {
  try {
    const item = await Skill.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== CERTIFICATES ===================
router.get('/certificates', async (req, res) => {
  try {
    const items = await Certificate.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/certificates', async (req, res) => {
  try {
    const item = await Certificate.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/certificates/:id', async (req, res) => {
  try {
    const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Certificate not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/certificates/:id', async (req, res) => {
  try {
    const item = await Certificate.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Certificate not found' });
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== REFLECTION ===================
router.get('/reflection', async (req, res) => {
  try {
    const reflection = await Reflection.findOne();
    res.json({ success: true, reflection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/reflection', async (req, res) => {
  try {
    let reflection = await Reflection.findOne();
    if (!reflection) {
      reflection = new Reflection(req.body);
    } else {
      Object.assign(reflection, req.body);
    }
    await reflection.save();
    res.json({ success: true, reflection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== CONTACT MESSAGES ===================
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =================== SETTINGS ===================
router.get('/settings', async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;
    const setting = await SiteSetting.findOneAndUpdate(
      { key },
      { key, value, description },
      { upsert: true, new: true }
    );
    res.json({ success: true, setting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

