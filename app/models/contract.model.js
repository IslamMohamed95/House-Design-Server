const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    user_code: {
      type: mongoose.Schema.Types.Number,
      ref: "User",
    },

    owner: {
      type: String,
      trim: true,
      lowercase: true,
    },
    location: { type: String, trim: true, lowercase: true },
    sale_executive: { type: String, trim: true, required: true },
    total_cost: {
      type: Number,
      required: true,
    },
    variations: {
      type: Boolean,
      required: true,
      default: false,
    },
    checkNote: {
      type: Boolean,
      required: true,
      default: false,
    },
    history: [
      {
        created_date: {
          type: Date,
          required: true,
        },
        assign_date: { type: String, trim: true, required: true },
        stage: {
          type: Number,
          required: true,
          enum: [0, 1, 2, 3, 4, 5],
          default: 1,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ["canceled", "under construction", "finishing", "completed"],
        },
        start_date: { type: String },
        end_date: { type: String },

        note: {
          type: String,
          default: null,
        },
        seen: {
          type: Boolean,
          require: true,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const contractModel = mongoose.model("Contract", contractSchema);
module.exports = contractModel;
