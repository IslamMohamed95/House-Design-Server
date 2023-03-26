require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://islammooma95:271195@house-deisgn.k1syohe.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("database is connected");
  }
);
