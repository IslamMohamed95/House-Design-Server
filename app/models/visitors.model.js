const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
});

const visitorModel = mongoose.model("Visitor", visitorSchema);
module.exports = visitorModel;
