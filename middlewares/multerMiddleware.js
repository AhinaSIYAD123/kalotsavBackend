const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/avi"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only video files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
