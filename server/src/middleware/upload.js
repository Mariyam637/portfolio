const multer = require('multer');
const path = require('path');
const fs = require('fs');

const serverUploadDir = path.join(__dirname, '../../public/uploads');
const clientUploadDir = path.join(__dirname, '../../../client/public/uploads');

if (!fs.existsSync(serverUploadDir)) {
  fs.mkdirSync(serverUploadDir, { recursive: true });
}
if (!fs.existsSync(clientUploadDir)) {
  fs.mkdirSync(clientUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, serverUploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBaseName}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const allowedDocMimes = ['application/pdf'];
  const ext = path.extname(file.originalname).toLowerCase();

  const isImage = allowedImageMimes.includes(file.mimetype) && ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  const isPdf = allowedDocMimes.includes(file.mimetype) && ext === '.pdf';

  if (isImage || isPdf) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WebP images and PDF documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB
  },
  fileFilter: fileFilter
});

// Helper to mirror uploaded file to client public folder for seamless static Vite access
const mirrorFileToClient = (filename) => {
  try {
    const src = path.join(serverUploadDir, filename);
    const dest = path.join(clientUploadDir, filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    console.error('Failed to mirror file to client upload dir:', err.message);
  }
};

module.exports = { upload, mirrorFileToClient };

