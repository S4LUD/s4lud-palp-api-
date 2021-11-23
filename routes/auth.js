const router = require("express").Router();
const surveyScheme = require("../models/surveyScheme");

// Add survey data
router.post("/survey", async (req, res) => {
  const data = new surveyScheme({
    year_level: req.body.year_level,
    section: req.body.section,
    email: req.body.email,
    program: req.body.program,
    osg1: req.body.osg1,
    osg2: req.body.osg2,
    iq1: req.body.iq1,
    iq2: req.body.iq2,
    iq3: req.body.iq3,
    sq1: req.body.sq1,
    sq2: req.body.sq2,
    sq3: req.body.sq3,
    tm1: req.body.tm1,
    tm2: req.body.tm2,
    tm3: req.body.tm3,
    le1: req.body.le1,
    le2: req.body.le2,
    le3: req.body.le3,
    sf1: req.body.sf1,
    sf2: req.body.sf2,
    sf3: req.body.sf3,
  });
  try {
    const UReg = await data.save();
    res.send({ message: "OK" });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get all users
router.get("/data", async (req, res) => {
  try {
    const data = await surveyScheme.find();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
