require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://islam:gLQDMQi7PfYxgT9t@housed.ims3c.mongodb.net/?retryWrites=true&w=majority&appName=Housed"
);

// "mongodb+srv://islam:i5TT5AqRxbaL0drP@housed.ims3c.mongodb.net/?retryWrites=true&w=majority&appName=Housed"
//`${process.env.DB_PORT}${process.env.DB_NAME}`
