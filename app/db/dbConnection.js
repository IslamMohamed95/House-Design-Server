require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://islam:tMEmNZuLpvloNySW@housed.ims3c.mongodb.net/"
);

//`${process.env.DB_PORT}${process.env.DB_NAME}`
