const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const whiteList = [".png", ".jpg", ".jpeg", ".webp"];
    if (ext.includes(whiteList)) {
      const fileName = Date.now() + ext;
      cb(null, fileName);
    } else {
      cb(new Error("you can only upload images"));
    }
  },
});
const _2MB = 2 * 1000 * 1000;
const uploadFile = multer({
  storage,
  limits: {
    fileSize: _2MB,
  },
});
module.exports = {
  uploadFile,
};
