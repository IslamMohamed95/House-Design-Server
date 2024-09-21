require("dotenv").config();
const mongoose = require("mongoose");

//mongoose.set("strictQuery", true);

mongoose.connect(`${process.env.DB_PORT}${process.env.DB_NAME}`, () => {
  console.log("database is connected");
});
