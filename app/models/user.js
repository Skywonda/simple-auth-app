const { hash } = require("argon2");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      select: false
    },
    provider: {
      type: String,
      enum: ["google", "facebook"],
    },
    provider_id: {
      type: String,
    },

    lastlogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password);
});

userSchema.method.updateLastLogin = function () {
  this.lastlogin = new Date();
  return this.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
