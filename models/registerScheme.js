const mongoose = require("mongoose");

const surveyScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  access: { type: Boolean, default: false },
  password: { type: String, required: true },
  credential: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", surveyScheme);
