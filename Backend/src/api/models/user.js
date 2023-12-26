const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "User",
  },
  designation: { type: String },
  fullName: { type: String, default: "User" },

  files: [
    {
      permission: { type: String },
      fileName: { type: String },
      size: { type: Number },
      date: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
