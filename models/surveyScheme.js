const mongoose = require("mongoose");

const surveyScheme = new mongoose.Schema({
  year_level: { type: Number, required: true },
  section: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, required: true },
  osg1: { type: String, required: true },
  osg2: { type: String, required: true },
  iq1: { type: Number, required: true },
  iq2: { type: Number, required: true },
  iq3: { type: Number, required: true },
  sq1: { type: Number, required: true },
  sq2: { type: Number, required: true },
  sq3: { type: Number, required: true },
  tm1: { type: Number, required: true },
  tm2: { type: Number, required: true },
  tm3: { type: Number, required: true },
  le1: { type: Number, required: true },
  le2: { type: Number, required: true },
  le3: { type: Number, required: true },
  sf1: { type: Number, required: true },
  sf2: { type: Number, required: true },
  sf3: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("survey", surveyScheme);
