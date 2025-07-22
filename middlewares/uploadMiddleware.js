const multer = require("multer");
const path = require("path");

// Set up storage destination and filename logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (.jpg, .jpeg, .png) are allowed"));
  }
};

// Initialize multer upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});

module.exports = upload;
