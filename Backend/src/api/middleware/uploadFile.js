const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/${req.params.userID}/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage,
});

