const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  contract_id: {
    type: String,
    trim: true,
    required: true,
  },
  file: {},
});

const variationModel = mongoose.model("Variations", variationSchema);
module.exports = variationModel;
