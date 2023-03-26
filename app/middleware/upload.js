const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let loc = "/temp/uploads";
    fs.mkdir(loc, (err) => {});
    cb(null, path.join(loc));
  },
  filename: function (req, file, cb) {
    let name =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

var upload = multer({
  storage,
});

module.exports = upload;
