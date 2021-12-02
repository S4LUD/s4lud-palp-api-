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
  password: { type: String, required: true },
  credential: { type: String, default: "user" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", surveyScheme);
