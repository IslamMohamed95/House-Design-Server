const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("validator");

const masterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) throw new Error("Invalid email !...");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "Master",
    },

    total_contracts: {
      type: Number,
      default: 0,
    },
    completed_contracts: { type: Number, default: 0 },
    pending_contracts: { type: Number, default: 0 },
    canceled_contracts: { type: Number, default: 0 },
    tokens: [{ token: { type: String, required: true } }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*----------- Encrypt password before save -----------*/
masterSchema.pre("save", async function () {
  const master = this;
  if (master.isModified("password")) {
    master.password = await bcrypt.hash(master.password, 10);
  }
});

const masterModel = mongoose.model("Master", masterSchema);
module.exports = masterModel;
