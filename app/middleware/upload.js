const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let loc;
//     loc = "upload";
//     cb(null, loc);
//   },
//   filename: function (req, file, cb) {
//     let name =
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//     cb(null, name);
//   },
// });

// var upload = multer({
//   storage,
// });

const storage = new GridFsStorage({
  url: "mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports = upload;
