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
    },
    profileImage: {
      type: String
    },
    password: String,

    googleId: String,
    facebookId: String,

    lastlogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.method.updateLastLogin = function () {
  this.lastlogin = new Date();
  return this.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
