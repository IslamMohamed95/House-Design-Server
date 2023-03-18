const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let loc;
    if (!req.master) loc = "uploads/master";
    else loc = path.join("uploads/master", req.master.name.toString());
    fs.mkdir(loc, (err) => {});
    cb(null, loc);
  },

  filename: function (req, file, cb) {
    let name = file.originalname;
    cb(null, name);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
