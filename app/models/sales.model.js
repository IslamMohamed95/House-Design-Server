const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    annual_target: {
      type: Number,
      required: true,
    },
    annual_achieving: {
      type: Number,
      default: 0,
    },
    monthly_target: {
      type: Number,
      required: true,
    },
    history: [
      {
        month: { type: String, required: true },
        achieved: { type: Number, default: 0 },
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const salesModel = mongoose.model("Sales", salesSchema);
module.exports = salesModel;
