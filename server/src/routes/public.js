const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');
const AcademicAchievement = require('../models/AcademicAchievement');
const Project = require('../models/Project');
const CompanyVisit = require('../models/CompanyVisit');
const ExtracurricularActivity = require('../models/ExtracurricularActivity');
const Event = require('../models/Event');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Reflection = require('../models/Reflection');

// GET /api/public/profile - Strictly omit dateOfBirth for public privacy!
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne().select('-dateOfBirth');
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/academics
router.get('/academics', async (req, res) => {
  try {
    const achievements = await AcademicAchievement.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, achievements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/company-visits
router.get('/company-visits', async (req, res) => {
  try {
    const visits = await CompanyVisit.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, visits });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await ExtracurricularActivity.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    const technical = skills.filter(s => s.category === 'technical');
    const professional = skills.filter(s => s.category === 'professional');
    res.json({ success: true, technical, professional, all: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/certificates
router.get('/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, certificates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/reflection
router.get('/reflection', async (req, res) => {
  try {
    const reflection = await Reflection.findOne();
    res.json({ success: true, reflection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/public/all - Consolidated bundle for super fast initial load
router.get('/all', async (req, res) => {
  try {
    const [profile, academics, projects, companyVisits, activities, events, skills, certificates, reflection] = await Promise.all([
      Profile.findOne().select('-dateOfBirth'),
      AcademicAchievement.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Project.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      CompanyVisit.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      ExtracurricularActivity.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Event.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Skill.find().sort({ order: 1, createdAt: 1 }),
      Certificate.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Reflection.findOne()
    ]);

    const technicalSkills = skills.filter(s => s.category === 'technical');
    const professionalSkills = skills.filter(s => s.category === 'professional');

    res.json({
      success: true,
      data: {
        profile,
        academics,
        projects,
        companyVisits,
        activities,
        events,
        skills: {
          technical: technicalSkills,
          professional: professionalSkills,
          all: skills
        },
        certificates,
        reflection
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

