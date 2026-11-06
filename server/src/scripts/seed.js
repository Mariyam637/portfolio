require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const AcademicAchievement = require('../models/AcademicAchievement');
const Project = require('../models/Project');
const CompanyVisit = require('../models/CompanyVisit');
const ExtracurricularActivity = require('../models/ExtracurricularActivity');
const Event = require('../models/Event');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Reflection = require('../models/Reflection');
const SiteSetting = require('../models/SiteSetting');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/riyas_nifran_portfolio';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB');

    // 1. Admin Seeding
    await Admin.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('nifran2026', salt);
    await Admin.create({
      username: 'RIYAS NIFRAN',
      password: hashedPassword,
      requirePasswordChange: true,
      role: 'admin'
    });
    console.log('[Seed] Admin created: RIYAS NIFRAN (First-time password change required: true)');

    // 2. Profile Seeding
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Riyas Nifran',
      degree: 'Bachelor of Business Management (Honours) in Accountancy',
      university: 'University of Kelaniya, Sri Lanka',
      faculty: 'Faculty of Commerce and Management Studies',
      department: 'Department of Accountancy',
      batch: '2023',
      currentAcademicYear: 'Second Year',
      dateOfBirth: '05 April 2003', // Admin-only
      location: 'Kalmunai, Ampara District, Sri Lanka',
      email: 'rnifran2003@gmail.com',
      phone: '+94 75 688 9403',
      linkedin: 'https://www.linkedin.com/in/riyanifran',
      github: '',
      heroTagline: 'Undergraduate in Accountancy | Aspiring Chartered Accountant (CA Sri Lanka)',
      introBio: 'I am Riyas Nifran, a motivated and detail-oriented undergraduate pursuing a Bachelor of Business Management (Honours) in Accountancy at the University of Kelaniya. I have a strong interest in accounting, finance, and business management. I have successfully completed AAT Level 3 and am currently pursuing the Business Level of Chartered Accountancy at CA Sri Lanka. I possess practical knowledge of accounting record management using Tally ERP and MYOB, along with basic proficiency in Microsoft Word and Excel. Additionally, I have experience in inventory management, storekeeping, and office documentation. My strengths include teamwork, communication, leadership, and time management. I am committed to continuous learning and professional development, with the goal of becoming a skilled accounting professional and contributing to organizational success.',
      qualificationHighlights: [
        'AAT Sri Lanka – Level 3 Completed (2024)',
        'CA Sri Lanka – Business Level (Currently Pursuing)',
        'University of Kelaniya – BBM (Hons) in Accountancy (2nd Year)',
        'Practical Accounting Experience: Tally ERP & MYOB',
        'G.C.E. Advanced Level Commerce – 3 As (Z-Score 1.7047)'
      ],
      careerObjectives: [
        'Become a qualified accounting professional.',
        'Complete the CA Sri Lanka qualification.',
        'Develop expertise in accounting and financial management.',
        'Gain practical professional experience in audit and corporate finance.',
        'Contribute to organizational success through disciplined financial governance.'
      ],
      profilePhotoUrl: '/assets/profile/nifran-portrait.jpg',
      profilePhotoNoBgUrl: '/assets/profile/nifran-portrait-nobg.png',
      cvDocumentUrl: ''
    });
    console.log('[Seed] Profile seeded');

    // 3. Academic Achievements Seeding
    await AcademicAchievement.deleteMany({});
    const academicsData = [
      {
        category: 'AL',
        title: 'G.C.E. Advanced Level – Commerce Stream',
        institution: 'Department of Examinations, Sri Lanka',
        completionYear: '2022',
        zScore: '1.7047',
        status: 'Completed',
        subjects: [
          { name: 'Business Studies', grade: 'A' },
          { name: 'Accounting', grade: 'A' },
          { name: 'Economics', grade: 'A' }
        ],
        documentName: 'A/L Official Results Sheet',
        documentUrl: '/assets/academic-results/RUJA.pdf',
        isPublished: true,
        order: 1
      },
      {
        category: 'AAT',
        title: 'AAT Sri Lanka – Level 3 (Final Level)',
        institution: 'Association of Accounting Technicians of Sri Lanka (AAT Sri Lanka)',
        completionYear: '2024',
        zScore: '',
        status: 'Completed (2024)',
        subjects: [
          { name: 'Financial Reporting', grade: 'A' },
          { name: 'Management Accounting and Finance', grade: 'A' },
          { name: 'Corporate and Personal Taxation', grade: 'B' },
          { name: 'Financial Control and Audit', grade: 'B' }
        ],
        documentName: 'AAT Level 3 Results & Certificate',
        documentUrl: '', // Displays "Document not uploaded yet"
        isPublished: true,
        order: 2
      },
      {
        category: 'CA',
        title: 'CA Sri Lanka – Chartered Accountancy',
        institution: 'Institute of Chartered Accountants of Sri Lanka (CA Sri Lanka)',
        completionYear: 'In Progress',
        zScore: '',
        status: 'Business Level – Currently Pursuing',
        subjects: [
          { name: 'Business Level Module I', grade: 'Enrolled' },
          { name: 'Business Level Module II', grade: 'Enrolled' }
        ],
        documentName: 'CA Sri Lanka Registration Verification',
        documentUrl: '',
        isPublished: true,
        order: 3
      },
      {
        category: 'OL',
        title: 'G.C.E. Ordinary Level Examination',
        institution: 'Department of Examinations, Sri Lanka',
        completionYear: '2019',
        zScore: '',
        status: 'Completed',
        subjects: [
          { name: 'Mathematics', grade: 'A' },
          { name: 'History', grade: 'A' },
          { name: 'Health & Physical Education', grade: 'A' },
          { name: 'Islamic Studies', grade: 'A' },
          { name: 'Tamil Language', grade: 'B' },
          { name: 'Tamil Literature', grade: 'B' },
          { name: 'Civics', grade: 'B' },
          { name: 'English Language', grade: 'C' },
          { name: 'Science', grade: 'C' }
        ],
        documentName: 'O/L Official Results Sheet',
        documentUrl: '',
        isPublished: true,
        order: 4
      }
    ];
    await AcademicAchievement.insertMany(academicsData);
    console.log('[Seed] Academic Achievements seeded');

    // 4. Projects Seeding
    await Project.deleteMany({});
    const projectsData = [
      {
        projectNumber: '01',
        title: 'Financial Accounting Standards & Reporting Analysis',
        category: 'Financial Accounting',
        objective: 'Understand accounting principles, Sri Lanka Accounting Standards (LKAS/SLFRS), and preparation of general-purpose financial reports.',
        contribution: [
          'Researched relevant accounting standards and regulatory disclosure requirements.',
          'Prepared comprehensive assignment content analyzing financial statements.',
          'Participated in group presentations communicating financial evaluation findings.'
        ],
        skills: ['Financial Analysis', 'Accounting Standards (SLFRS/LKAS)', 'Teamwork', 'Communication'],
        outcome: 'Improved financial accounting knowledge, standard application, and balance sheet reconciliation competence.',
        imageUrl: '',
        documentUrl: '',
        isPublished: true,
        order: 1
      },
      {
        projectNumber: '02',
        title: 'Human Resource Management & Employee Grievance Framework',
        category: 'Human Resource Management',
        objective: 'Understand HRM practices, employee motivation frameworks, and structured dispute/grievance management in corporate organizations.',
        contribution: [
          'Studied employee grievance handling mechanisms and organizational labor relations.',
          'Prepared structured assignment content assessing real corporate case studies.',
          'Participated actively in team presentations and peer review sessions.'
        ],
        skills: ['Teamwork', 'Leadership', 'Problem Solving', 'Organizational Analysis'],
        outcome: 'Improved understanding of HRM activities, internal mediation protocols, and workforce management.',
        imageUrl: '',
        documentUrl: '',
        isPublished: true,
        order: 2
      },
      {
        projectNumber: '03',
        title: 'Corporate and Personal Taxation Principles',
        category: 'Taxation',
        objective: 'Understand Inland Revenue taxation rules, direct and indirect tax calculations, withholding tax (WHT), and corporate compliance.',
        contribution: [
          'Researched statutory taxation provisions and Inland Revenue Department guidelines.',
          'Studied relevant tax updates, tax brackets, and allowable deductions.',
          'Prepared assignment calculations for individual income tax and business profit computations.'
        ],
        skills: ['Tax Computations', 'Analytical Thinking', 'Attention to Detail', 'Statutory Compliance'],
        outcome: 'Improved taxation knowledge and practical capability to compute statutory obligations under Sri Lankan tax laws.',
        imageUrl: '',
        documentUrl: '',
        isPublished: true,
        order: 3
      },
      {
        projectNumber: '04',
        title: 'Advanced Corporate Finance & Capital Structure Decision-Making',
        category: 'Advanced Corporate Finance',
        objective: 'Understand corporate finance valuation techniques, cost of capital, dividend decisions, and optimal capital structure models.',
        contribution: [
          'Studied debt vs. equity capital structure dynamics and financial leverage metrics.',
          'Reviewed foundational financial theories including Modigliani-Miller and Pecking Order.',
          'Completed financial analysis, weighted average cost of capital (WACC), and scenario evaluations.',
          'Prepared professional presentation slides delivering risk-return insights.'
        ],
        skills: ['Financial Modeling & Analysis', 'Capital Budgeting', 'Problem Solving', 'Financial Decision-Making'],
        outcome: 'Improved financial decision-making knowledge, financial risk evaluation, and corporate governance proficiency.',
        imageUrl: '',
        documentUrl: '',
        isPublished: true,
        order: 4
      }
    ];
    await Project.insertMany(projectsData);
    console.log('[Seed] Projects seeded');

    // 5. Company Visits Seeding
    await CompanyVisit.deleteMany({});
    const visitsData = [
      {
        visitNumber: '01',
        companyName: 'Kelani Cables PLC',
        area: 'Human Resource Management',
        purpose: 'Understand HRM practices, industrial health and safety, and employee relations in a leading manufacturing public limited company.',
        contribution: [
          'Participated in the factory and corporate office field study at Kelani Cables PLC.',
          'Identified operational HRM practices across manufacturing and administrative divisions.',
          'Studied employee grievance management procedures and resolution channels.',
          'Gathered firsthand information regarding union liaison, worker safety, and compliant dispute handling.'
        ],
        skills: ['Professional Communication', 'Corporate Observation', 'Teamwork', 'Analytical Skills'],
        keyLearning: 'Gained practical exposure to HRM activities, structured employee grievance management, and shop-floor organizational dynamics.',
        gallery: [
          { imageUrl: '/assets/company-visits/visit-1.jpg', caption: 'Industrial Visit at Kelani Cables PLC' }
        ],
        documentUrl: '',
        isPublished: true,
        order: 1
      },
      {
        visitNumber: '02',
        companyName: 'LB Finance PLC, Kelaniya Branch',
        area: 'Corporate Finance & Banking Operations',
        purpose: 'Understand commercial financial activities, credit assessment, leasing, and corporate finance practices within Sri Lanka’s non-banking financial sector.',
        contribution: [
          'Participated in the branch immersion visit at LB Finance PLC Kelaniya Branch.',
          'Gathered detailed information on daily financial intermediary activities and treasury management.',
          'Studied loan facilities, leasing products, fixed deposits, and customer financial services.',
          'Identified the crucial role of credit management and asset liability matching in branch operations.',
          'Learned practical aspects of financing decisions and financial risk management.'
        ],
        skills: ['Financial Analysis', 'Financial Product Evaluation', 'Professional Communication', 'Problem Solving'],
        keyLearning: 'Developed practical knowledge of corporate finance, financial services, credit evaluation, and financial risk mitigation.',
        gallery: [
          { imageUrl: '/assets/company-visits/visit-2.jpg', caption: 'LB Finance PLC Branch Immersion' }
        ],
        documentUrl: '',
        isPublished: true,
        order: 2
      }
    ];
    await CompanyVisit.insertMany(visitsData);
    console.log('[Seed] Company Visits seeded');

    // 6. Extracurricular Activities Seeding
    await ExtracurricularActivity.deleteMany({});
    const activitiesData = [
      {
        title: 'Association of Islamic Students (AIS)',
        organization: 'University of Kelaniya',
        description: [
          'Active student member participating in departmental and university-wide cultural and welfare initiatives.',
          'Helped organize university events, spiritual seminars, and community outreach programmes.',
          'Coordinated attendee logistics, guest welcomes, and programme materials distribution.'
        ],
        skills: ['Community Engagement', 'Coordination', 'Teamwork', 'Communication'],
        imageUrl: '',
        date: '2023 - Present',
        isPublished: true,
        order: 1
      },
      {
        title: 'Leadership and Event Organizing Committee',
        organization: 'Faculty of Commerce and Management Studies',
        description: [
          'Participated in planning and executing university academic and social events.',
          'Coordinated activities dynamically with cross-functional student teams and faculty advisors.',
          'Demonstrated reliable initiative, time management, and organizational leadership under deadlines.'
        ],
        skills: ['Leadership', 'Event Management', 'Coordination', 'Conflict Resolution'],
        imageUrl: '',
        date: '2023 - 2024',
        isPublished: true,
        order: 2
      },
      {
        title: 'Sports & Athletics – Cricket Team Member',
        organization: 'Departmental Sports & University Tournaments',
        description: [
          'Represented the team in competitive cricket and sports activities.',
          'Fostered high team spirit, sportsmanship, physical discipline, and tactical execution under match pressure.',
          'Contributed to team planning, training sessions, and collective success.'
        ],
        skills: ['Teamwork', 'Discipline', 'Tactical Thinking', 'High Pressure Resilience'],
        imageUrl: '',
        date: '2023 - Present',
        isPublished: true,
        order: 3
      },
      {
        title: 'University Challenge Event – Egyptians House',
        organization: 'University of Kelaniya Inter-House Competitions',
        description: [
          'Participated in campus-wide challenge events and inter-house talent tournaments.',
          'Acted as a dedicated member of Egyptians House, contributing points across collaborative games.',
          'Enhanced peer camaraderie, mutual support, and cross-faculty networking.'
        ],
        skills: ['Competitive Collaboration', 'Strategic Coordination', 'Peer Motivation'],
        imageUrl: '',
        date: '2024',
        isPublished: true,
        order: 4
      },
      {
        title: 'Deepavali Celebration Organization',
        organization: 'University of Kelaniya Cultural Guild',
        description: [
          'Participated actively in traditional festival preparations celebrating diversity and unity on campus.',
          'Helped design, prepare, and arrange floral decorations, venue lighting, and hospitality arrangements.',
          'Cultivated inter-cultural empathy, team creativity, and inclusive leadership.'
        ],
        skills: ['Creative Execution', 'Cultural Inclusivity', 'Team Collaboration'],
        imageUrl: '',
        date: '2023 - 2024',
        isPublished: true,
        order: 5
      },
      {
        title: 'Adventure Park Outbound Field Visit',
        organization: 'University Student Development Programme',
        description: [
          'Participated in outdoor obstacle courses, trust-building initiatives, and experiential training.',
          'Sharpened interpersonal agility, risk evaluation, and problem-solving in dynamic group settings.',
          'Strengthened bonds with classmates across diverse management specializations.'
        ],
        skills: ['Interpersonal Agility', 'Team Dynamics', 'Adaptive Thinking'],
        imageUrl: '',
        date: '2024',
        isPublished: true,
        order: 6
      },
      {
        title: 'School-Level Social Work & Community Volunteering',
        organization: 'Kalmunai Community Outreach & School Clubs',
        description: [
          'Participated in environmental cleaning drives, book distribution, and educational support for underprivileged youth.',
          'Cultivated deep civic responsibility, public empathy, and grassroots cooperative execution.',
          'Demonstrated dedication to ethical public citizenship and community welfare.'
        ],
        skills: ['Social Responsibility', 'Public Service', 'Altruism', 'Grassroots Cooperation'],
        imageUrl: '',
        date: 'Prior to University - Ongoing',
        isPublished: true,
        order: 7
      }
    ];
    await ExtracurricularActivity.insertMany(activitiesData);
    console.log('[Seed] Extracurricular Activities seeded');

    // 7. Events & Workshops Seeding
    await Event.deleteMany({});
    const eventsData = [
      {
        title: 'Contemporary Financial Reporting & Auditing Standards Seminar',
        organizer: 'Department of Accountancy, University of Kelaniya',
        date: '2024',
        description: 'Comprehensive seminar examining practical implementation of SLFRS/LKAS standards, auditing best practices, and ethical duties of accountants in corporate environments.',
        imageUrl: '',
        certificateUrl: '',
        attendanceStatus: 'Attended',
        isPublished: true,
        order: 1
      },
      {
        title: 'National Tax Awareness & Inland Revenue Guidelines Workshop',
        organizer: 'Association of Accounting Technicians (AAT) Sri Lanka',
        date: '2024',
        description: 'Interactive session exploring corporate income tax amendments, withholding taxes, electronic RAMIS filing procedures, and value-added tax compliance in Sri Lanka.',
        imageUrl: '',
        certificateUrl: '',
        attendanceStatus: 'Attended',
        isPublished: true,
        order: 2
      },
      {
        title: 'Career Advancement & Professional Ethics in Chartered Accountancy',
        organizer: 'Faculty of Commerce and Management Studies & CA Sri Lanka',
        date: '2023',
        description: 'Industry dialogue bridging academic theory with professional expectations in audit firms, investment banking, and corporate financial controller roles.',
        imageUrl: '',
        certificateUrl: '',
        attendanceStatus: 'Attended',
        isPublished: true,
        order: 3
      }
    ];
    await Event.insertMany(eventsData);
    console.log('[Seed] Events seeded');

    // 8. Skills Seeding (Technical & Professional)
    await Skill.deleteMany({});
    const skillsData = [
      // Technical Skills
      {
        name: 'Tally ERP',
        category: 'technical',
        practicalArea: 'Accounting Software',
        description: 'Practical experience with voucher entries, ledger maintenance, trial balance preparation, and stock verification.',
        order: 1
      },
      {
        name: 'MYOB (Mind Your Own Business)',
        category: 'technical',
        practicalArea: 'Financial Management Software',
        description: 'Practical experience in transaction posting, debtors/creditors sub-ledgers, and basic financial statement generation.',
        order: 2
      },
      {
        name: 'Microsoft Excel',
        category: 'technical',
        practicalArea: 'Financial Analysis & Spreadsheets',
        description: 'Proficiency in financial functions, formula modeling, pivot tables, data sorting, and reconciliation sheets.',
        order: 3
      },
      {
        name: 'Microsoft Word',
        category: 'technical',
        practicalArea: 'Executive Documentation',
        description: 'Proficiency in formal corporate correspondence, financial reports, meeting minutes, and professional briefs.',
        order: 4
      },
      {
        name: 'Accounting Record Management',
        category: 'technical',
        practicalArea: 'Bookkeeping & Compliance',
        description: 'Practical knowledge of double-entry record keeping, ledger posting, source document archiving, and audit trails.',
        order: 5
      },
      {
        name: 'Inventory Management',
        category: 'technical',
        practicalArea: 'Logistics & Asset Control',
        description: 'Hands-on experience tracking physical stock levels, stock reconciliation, valuation checks, and variance reporting.',
        order: 6
      },
      {
        name: 'Storekeeping',
        category: 'technical',
        practicalArea: 'Warehouse Operations',
        description: 'Experience in goods receipt notes (GRN), issuing stock, maintaining bin cards, and organized storage procedures.',
        order: 7
      },
      {
        name: 'Office Documentation',
        category: 'technical',
        practicalArea: 'Administrative Operations',
        description: 'Systematic filing, indexing of corporate vouchers, dispatch logs, invoice collation, and regulatory compliance records.',
        order: 8
      },
      // Professional Skills
      {
        name: 'Communication',
        category: 'professional',
        practicalArea: 'Interpersonal & Reporting',
        description: 'Clear written reporting and articulate verbal presentation of financial data and project findings.',
        order: 9
      },
      {
        name: 'Teamwork',
        category: 'professional',
        practicalArea: 'Collaborative Projects',
        description: 'Proven ability to cooperate respectfully within multidisciplinary student groups and work committees.',
        order: 10
      },
      {
        name: 'Leadership',
        category: 'professional',
        practicalArea: 'Initiative & Guidance',
        description: 'Demonstrated capacity to guide peers, organize committee tasks, and take accountability for collective deliverables.',
        order: 11
      },
      {
        name: 'Time Management',
        category: 'professional',
        practicalArea: 'Deadline Discipline',
        description: 'Punctual execution of rigorous university coursework alongside concurrent professional CA and AAT studies.',
        order: 12
      },
      {
        name: 'Analytical Thinking',
        category: 'professional',
        practicalArea: 'Quantitative Problem Solving',
        description: 'Methodical approach to dissecting financial statements, identifying standard variances, and evaluating commercial data.',
        order: 13
      },
      {
        name: 'Problem Solving',
        category: 'professional',
        practicalArea: 'Practical Solutions',
        description: 'Constructive mindset in resolving organizational bottlenecks, team scheduling conflicts, and data discrepancies.',
        order: 14
      },
      {
        name: 'Attention to Detail',
        category: 'professional',
        practicalArea: 'Financial Accuracy',
        description: 'Rigorous precision in verifying numerical accuracy, journal entries, compliance checklists, and calculations.',
        order: 15
      }
    ];
    await Skill.insertMany(skillsData);
    console.log('[Seed] Skills seeded');

    // 9. Certificates Seeding
    await Certificate.deleteMany({});
    const certificatesData = [
      {
        title: 'AAT Sri Lanka – Level 3 Certificate',
        issuingOrganization: 'Association of Accounting Technicians of Sri Lanka',
        issueDate: '2024',
        description: 'Passed all final stage subjects covering Financial Reporting, Management Accounting & Finance, Taxation, and Audit.',
        documentUrl: '',
        previewUrl: '',
        credentialId: 'AAT-SL-2024-L3',
        isPublished: true,
        order: 1
      },
      {
        title: 'CA Sri Lanka – Business Level Enrollment & Record',
        issuingOrganization: 'The Institute of Chartered Accountants of Sri Lanka',
        issueDate: '2024',
        description: 'Currently pursuing the Business Level qualification to attain full Chartered Accountant credential.',
        documentUrl: '',
        previewUrl: '',
        credentialId: 'CASL-BL-ENROLL',
        isPublished: true,
        order: 2
      },
      {
        title: 'G.C.E. Advanced Level Certificate – Commerce Stream',
        issuingOrganization: 'Department of Examinations, Sri Lanka',
        issueDate: '2022',
        description: 'Attained 3 As in Business Studies, Accounting, and Economics with Z-Score of 1.7047.',
        documentUrl: '/assets/academic-results/RUJA.pdf',
        previewUrl: '',
        credentialId: 'DOE-AL-COMMERCE-1.7047',
        isPublished: true,
        order: 3
      }
    ];
    await Certificate.insertMany(certificatesData);
    console.log('[Seed] Certificates seeded');

    // 10. Reflection Seeding
    await Reflection.deleteMany({});
    await Reflection.create({
      whatILearned: 'Through my studies at the University of Kelaniya, I developed knowledge in accounting, finance, taxation, Human Resource Management, and business management. Assignments, presentations, and group activities helped improve my communication, teamwork, leadership, and analytical skills.',
      mostValuableExperience: 'The company visits to Kelani Cables PLC and LB Finance PLC were particularly valuable. They provided practical exposure to HRM practices, employee grievance handling, corporate finance, and financial activities in real organizations.',
      strengths: [
        'Teamwork',
        'Communication',
        'Time Management',
        'Analytical Thinking',
        'Willingness to Learn'
      ],
      areasToImprove: [
        'Presentation Skills',
        'Technical Knowledge',
        'Practical Professional Experience'
      ],
      challengesAndSolutions: 'Group assignments and presentations involved challenges such as time management, collecting information, and coordinating with teammates. I addressed these challenges through collaboration, sharing responsibilities, and completing tasks within deadlines.',
      futureCareerGoals: 'My goal is to become a qualified accounting professional. I plan to complete my CA qualification, strengthen my technical and professional skills, gain practical experience, and continuously develop my knowledge of accounting and finance.'
    });
    console.log('[Seed] Reflection seeded');

    // 11. Initial Site Settings
    await SiteSetting.deleteMany({});
    await SiteSetting.create([
      { key: 'siteTitle', value: 'Riyas Nifran | Executive Accounting & Finance Portfolio', description: 'Main page title' },
      { key: 'theme', value: 'EXECUTIVE_FINANCE', description: 'Active color and layout theme' },
      { key: 'primaryColor', value: '#10243A', description: 'Midnight Navy' },
      { key: 'accentColor', value: '#B89A5A', description: 'Champagne Gold' },
      { key: 'allowPublicMessages', value: true, description: 'Toggle contact form' }
    ]);
    console.log('[Seed] Site settings seeded');

    console.log('\n=========================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(' Admin Username: RIYAS NIFRAN');
    console.log(' Admin Password: nifran2026');
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();

