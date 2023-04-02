require("dotenv").config();
const mongoose = require("mongoose");

DB_NAME = process.env.DB_NAME;
DB_PORT = process.env.DB_PORT;

mongoose.set("strictQuery", false);
mongoose.connect(`${DB_PORT}${DB_NAME}`, () => {
  console.log("database is connected");
});

// "mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority"
// `${DB_PORT}${DB_NAME}`;
