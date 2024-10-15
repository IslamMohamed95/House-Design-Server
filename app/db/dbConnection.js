require("dotenv").config();
const mongoose = require("mongoose");

//mongoose.set("strictQuery", true);

mongoose.connect(
  `mongodb+srv://islam:271195@housed.ims3c.mongodb.net/?retryWrites=true&w=majority&appName=Housed`,
  () => {
    console.log("database is connected");
  }
);
