const mongoose = require('mongoose');

const ReflectionSchema = new mongoose.Schema({
  whatILearned: {
    type: String,
    required: true,
    default: 'Through my studies at the University of Kelaniya, I developed knowledge in accounting, finance, taxation, Human Resource Management, and business management. Assignments, presentations, and group activities helped improve my communication, teamwork, leadership, and analytical skills.'
  },
  mostValuableExperience: {
    type: String,
    required: true,
    default: 'The company visits to Kelani Cables PLC and LB Finance PLC were particularly valuable. They provided practical exposure to HRM practices, employee grievance handling, corporate finance, and financial activities in real organizations.'
  },
  strengths: {
    type: [String],
    default: [
      'Teamwork',
      'Communication',
      'Time Management',
      'Analytical Thinking',
      'Willingness to Learn'
    ]
  },
  areasToImprove: {
    type: [String],
    default: [
      'Presentation Skills',
      'Technical Knowledge',
      'Practical Professional Experience'
    ]
  },
  challengesAndSolutions: {
    type: String,
    required: true,
    default: 'Group assignments and presentations involved challenges such as time management, collecting information, and coordinating with teammates. I addressed these challenges through collaboration, sharing responsibilities, and completing tasks within deadlines.'
  },
  futureCareerGoals: {
    type: String,
    required: true,
    default: 'My goal is to become a qualified accounting professional. I plan to complete my CA qualification, strengthen my technical and professional skills, gain practical experience, and continuously develop my knowledge of accounting and finance.'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reflection', ReflectionSchema);

