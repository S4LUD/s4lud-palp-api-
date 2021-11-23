const mongoose = require("mongoose");

const surveyScheme = new mongoose.Schema({
  year_level: { type: String, required: true },
  section: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, required: true },
  osg1: { type: String, required: true },
  osg2: { type: String, required: true },
  iq1: { type: String, required: true },
  iq2: { type: String, required: true },
  iq3: { type: String, required: true },
  sq1: { type: String, required: true },
  sq2: { type: String, required: true },
  sq3: { type: String, required: true },
  tm1: { type: String, required: true },
  tm2: { type: String, required: true },
  tm3: { type: String, required: true },
  le1: { type: String, required: true },
  le2: { type: String, required: true },
  le3: { type: String, required: true },
  sf1: { type: String, required: true },
  sf2: { type: String, required: true },
  sf3: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("survey", surveyScheme);
