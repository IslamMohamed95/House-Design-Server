const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
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
    assign_date: {
      type: String,
      required: true,
    },
    Notes: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const visitorModel = mongoose.model("Visitor", visitorSchema);
module.exports = visitorModel;
