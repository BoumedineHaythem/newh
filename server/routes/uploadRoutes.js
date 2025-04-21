import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as Sentry from "@sentry/node";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '.unknown'; // Fallback extension
    cb(null, 'file-' + uniqueSuffix + ext);
  }
});

// More permissive file filter
const fileFilter = (req, file, cb) => {
  // Accept a wider range of file types
  const allowedTypes = [
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/rtf',
    'text/markdown',
    
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
    
    // Archives
    'application/zip',
    'application/x-zip-compressed',
    'application/x-7z-compressed',
    'application/x-rar-compressed',
    'application/gzip',
    
    // Code
    'application/json',
    'text/javascript',
    'text/html',
    'text/css',
    'application/xml',
    
    // Fallback for other types
    'application/octet-stream'
  ];
  
  // Check if file type is allowed or if mimetype starts with allowed prefix
  const isAllowed = allowedTypes.includes(file.mimetype) ||
                    allowedTypes.some(type => file.mimetype.startsWith(type.split('/')[0]));
                    
  if (isAllowed) {
    cb(null, true);
  } else {
    console.warn(`Rejected file upload with mimetype: ${file.mimetype}`);
    cb(null, false); // Don't throw error, just reject the file
  }
};

// Setup upload middleware with error handling
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
}).single('file');

// File upload endpoint with better error handling
router.post('/', (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // Multer error (file too large, etc)
      console.error('Multer error:', err);
      Sentry.captureException(err);
      return res.status(400).json({
        error: 'File upload error',
        message: err.message
      });
    } else if (err) {
      // Unknown error
      console.error('Unknown upload error:', err);
      Sentry.captureException(err);
      return res.status(500).json({
        error: 'Server error during upload',
        message: err.message
      });
    }
    
    // Check if file was filtered out
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded or file type not supported'
      });
    }
    
    // Success - construct the URL path to the file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    // Log successful upload
    console.log(`File uploaded successfully: ${req.file.filename}, size: ${req.file.size} bytes, mimetype: ${req.file.mimetype}`);
    
    res.status(201).json({
      message: 'File uploaded successfully',
      file: req.file,
      fileUrl: fileUrl
    });
  });
});

export default router;