const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Riyas Nifran'
  },
  degree: {
    type: String,
    required: true,
    default: 'Bachelor of Business Management (Honours) in Accountancy'
  },
  university: {
    type: String,
    required: true,
    default: 'University of Kelaniya, Sri Lanka'
  },
  faculty: {
    type: String,
    default: 'Faculty of Commerce and Management Studies'
  },
  department: {
    type: String,
    default: 'Department of Accountancy'
  },
  batch: {
    type: String,
    default: '2023'
  },
  currentAcademicYear: {
    type: String,
    default: 'Second Year'
  },
  // PRIVACY: Date of birth is Admin-only, never sent to public responses!
  dateOfBirth: {
    type: String,
    default: '05 April 2003'
  },
  location: {
    type: String,
    default: 'Kalmunai, Ampara District, Sri Lanka'
  },
  email: {
    type: String,
    default: 'rnifran2003@gmail.com'
  },
  phone: {
    type: String,
    default: '+94 75 688 9403'
  },
  linkedin: {
    type: String,
    default: 'https://www.linkedin.com/in/riyanifran'
  },
  github: {
    type: String,
    default: ''
  },
  heroTagline: {
    type: String,
    default: 'Undergraduate in Accountancy | Aspiring Chartered Accountant'
  },
  introBio: {
    type: String,
    default: 'I am Riyas Nifran, a motivated and detail-oriented undergraduate pursuing a Bachelor of Business Management (Honours) in Accountancy at the University of Kelaniya. I have a strong interest in accounting, finance, and business management. I have successfully completed AAT Level 3 and am currently pursuing the Business Level of Chartered Accountancy at CA Sri Lanka. I possess practical knowledge of accounting record management using Tally ERP and MYOB, along with basic proficiency in Microsoft Word and Excel. Additionally, I have experience in inventory management, storekeeping, and office documentation. My strengths include teamwork, communication, leadership, and time management. I am committed to continuous learning and professional development, with the goal of becoming a skilled accounting professional and contributing to organizational success.'
  },
  qualificationHighlights: {
    type: [String],
    default: [
      'AAT Sri Lanka – Level 3 Completed (2024)',
      'CA Sri Lanka – Business Level (Currently Pursuing)',
      'University of Kelaniya – BBM (Hons) in Accountancy (2nd Year)',
      'Practical Accounting Software: Tally ERP & MYOB',
      'G.C.E. Advanced Level Commerce – 3 As (Z-Score 1.7047)'
    ]
  },
  careerObjectives: {
    type: [String],
    default: [
      'Become a qualified accounting professional.',
      'Complete the CA Sri Lanka qualification.',
      'Develop expertise in accounting and financial management.',
      'Gain practical professional experience in audit and corporate finance.',
      'Contribute to organizational success through disciplined financial governance.'
    ]
  },
  profilePhotoUrl: {
    type: String,
    default: '/assets/profile/nifran-portrait.jpg'
  },
  profilePhotoNoBgUrl: {
    type: String,
    default: '/assets/profile/nifran-portrait-nobg.png'
  },
  cvDocumentUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);

