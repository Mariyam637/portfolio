const mongoose = require('mongoose');
const AcademicAchievement = require('../models/AcademicAchievement');
const Certificate = require('../models/Certificate');
const Document = require('../models/Document');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function updateCertificates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/riyas_nifran_portfolio');
    console.log('[DB Connected]');

    // 1. Update A/L Achievement
    await AcademicAchievement.findOneAndUpdate(
      { category: 'AL' },
      {
        documentUrl: '/assets/academic-results/gce-al-official-results.pdf',
        documentName: 'G.C.E. (A/L) Official Results Schedule (Index: 9078428)'
      }
    );

    // 2. Update AAT Achievement
    await AcademicAchievement.findOneAndUpdate(
      { category: 'AAT' },
      {
        documentUrl: '/assets/academic-results/aat-level3-official-results.pdf',
        documentName: 'AAT Sri Lanka Official Examination Results Sheet (Reg: 3952320)'
      }
    );

    // 3. Update O/L Achievement
    await AcademicAchievement.findOneAndUpdate(
      { category: 'OL' },
      {
        documentUrl: '/assets/academic-results/gce-ol-official-results.pdf',
        documentName: 'G.C.E. (O/L) Official Results Schedule (Index: 96140500)'
      }
    );

    // 4. Update Certificates
    await Certificate.findOneAndUpdate(
      { title: { $regex: /AAT/i } },
      {
        documentUrl: '/assets/academic-results/aat-level3-official-results.pdf',
        description: 'AAT Sri Lanka Official Results Sheet: Passed Level 1, Level 2, and Level 3 with Distinction & Credit passes (Registration No: 3952320, Index: 02032).'
      }
    );

    await Certificate.findOneAndUpdate(
      { title: { $regex: /Advanced Level/i } },
      {
        documentUrl: '/assets/academic-results/gce-al-official-results.pdf',
        description: 'Department of Examinations Official Results Schedule: 3 Passes (3 As) in Commerce Stream, Common General Test: 62, Z-Score: 1.7047, Island Rank: 2275.'
      }
    );

    // Add or update O/L Certificate
    const olCert = await Certificate.findOne({ title: { $regex: /Ordinary Level/i } });
    if (!olCert) {
      await Certificate.create({
        title: 'G.C.E. Ordinary Level Examination Results Certificate',
        issuingOrganization: 'Department of Examinations, Sri Lanka',
        issueDate: '2019',
        description: 'Passed with 4 As, 3 Bs, and 2 Cs (Index No: 96140500) from Al-Ashraff Maha Vidyalaya, Karaitivu.',
        documentUrl: '/assets/academic-results/gce-ol-official-results.pdf',
        credentialId: 'DOE-OL-2019-96140500',
        isPublished: true,
        order: 4
      });
    } else {
      await Certificate.findByIdAndUpdate(olCert._id, {
        documentUrl: '/assets/academic-results/gce-ol-official-results.pdf'
      });
    }

    // Add or update Sports Merit Certificate
    const sportsCert = await Certificate.findOne({ title: { $regex: /Sports Meet/i } });
    if (!sportsCert) {
      await Certificate.create({
        title: 'Certificate of Merit – Inter School Sports Meet',
        issuingOrganization: 'Karaitivu Educational Division, Ministry of Education',
        issueDate: '2015 & 2016',
        description: 'Certificate of Merit in Long Jump (Under 15) and 200M (Under 13) representing Al-Ashraff Maha Vidyalaya.',
        documentUrl: '/assets/certificates/sports-merit-certificates-2015-2016.pdf',
        credentialId: 'KARAITIVU-SPORTS-MERIT',
        isPublished: true,
        order: 5
      });
    }

    // 5. Add Document records for Document Library
    const docsToAdd = [
      {
        name: 'AAT Sri Lanka Examination Results Sheet',
        category: 'result',
        fileUrl: '/assets/academic-results/aat-level3-official-results.pdf',
        originalFilename: 'aat-level3-official-results.pdf',
        fileSize: 1266101,
        mimeType: 'application/pdf'
      },
      {
        name: 'G.C.E. A/L Official Results Schedule (Commerce Stream)',
        category: 'result',
        fileUrl: '/assets/academic-results/gce-al-official-results.pdf',
        originalFilename: 'gce-al-official-results.pdf',
        fileSize: 1365087,
        mimeType: 'application/pdf'
      },
      {
        name: 'G.C.E. O/L Official Results Schedule',
        category: 'result',
        fileUrl: '/assets/academic-results/gce-ol-official-results.pdf',
        originalFilename: 'gce-ol-official-results.pdf',
        fileSize: 1351647,
        mimeType: 'application/pdf'
      },
      {
        name: 'Certificate of Merit – Inter School Sports Meet 2015 & 2016',
        category: 'certificate',
        fileUrl: '/assets/certificates/sports-merit-certificates-2015-2016.pdf',
        originalFilename: 'sports-merit-certificates-2015-2016.pdf',
        fileSize: 1657535,
        mimeType: 'application/pdf'
      }
    ];

    for (const doc of docsToAdd) {
      await Document.findOneAndUpdate(
        { fileUrl: doc.fileUrl },
        doc,
        { upsert: true }
      );
    }

    console.log('[SUCCESS] All certificates and official examination results linked in MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateCertificates();

