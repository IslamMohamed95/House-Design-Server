const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
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
    code: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    joining_date: {
      type: String,
      required: true,
    },

    tokens: [{ token: { type: String, required: true } }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.virtual("Contract", {
  //Relation Between (users) and (contracts)
  ref: "Contract",
  localField: "code",
  foreignField: "user_code",
});

/*----------- Encrypt password before save -----------*/
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
