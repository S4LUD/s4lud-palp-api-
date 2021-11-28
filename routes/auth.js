const router = require("express").Router();
const surveyScheme = require("../models/surveyScheme");
const registerScheme = require("../models/registerScheme");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { regScheme, logScheme } = require("../models/validation");
const dotenv = require("dotenv");

dotenv.config();

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

//Count all programs
router.get("/count", async (req, res) => {
  try {
    const count1 = await surveyScheme.count({ program: "bscs" });
    const count2 = await surveyScheme.count({ program: "bsit" });
    const count3 = await surveyScheme.count({ program: "act" });
    res.send([
      { program: "bscs", count: count1 },
      { program: "bsit", count: count2 },
      { program: "act", count: count3 },
    ]);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Register the user
router.post("/register", async (req, res) => {
  const { error } = regScheme(req.body);
  if (error)
    return res.status(400).send({ error: error["details"][0]["message"] });

  const UsernameExist = await registerScheme.findOne({
    username: req.body.username,
  });
  if (UsernameExist) return res.status(400).send({ found: 1 });

  const EmailExist = await registerScheme.findOne({
    email: req.body.email,
  });
  if (EmailExist) return res.status(400).send({ found: 1 });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const data = new registerScheme({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const UReg = await data.save();
    if (UReg) return res.send({ message: "OK" });
  } catch (err) {
    res.status(400).send({ message: err["message"] });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = logScheme(req.body);
    if (error)
      return res.status(400).send({ error: error["details"][0]["message"] });

    const user = await registerScheme.findOne({
      username: req.body.username,
    });
    if (!user) return res.status(400).send({ found: 0 });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send({ message: "Invalid Credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send({ message: err["message"] });
  }
});

module.exports = router;
