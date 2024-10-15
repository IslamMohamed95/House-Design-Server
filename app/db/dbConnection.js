const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DataBase;
mongoose.connect(`${DB}`, () => {
  console.log("Database is connected");
});
