const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://islam:271195@housed.ims3c.mongodb.net/?retryWrites=true&w=majority&appName=Housed",
  () => {
    console.log("Database is connected");
  }
);
