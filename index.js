const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/palp", authRoute);

app.listen(process.env.PORT || 5719, () =>
  console.log(
    `Server is up and running on! http://localhost:${
      process.env.PORT || 5719
    }/api/palp/`
  )
);
