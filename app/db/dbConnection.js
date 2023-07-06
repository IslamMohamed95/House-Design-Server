require("dotenv").config();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

mongoose.set("strictQuery", true);
// mongoose.connect(
//   "mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority",
//   () => {
//     console.log("database is connected");
//   }
// );
const conn = mongoose.createConnection(
  "mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority"
);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("variations");
});
//"mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority"
//`${process.env.DB_PORT}${process.env.DB_NAME}`
