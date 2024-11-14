const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

app.use("/api/user", require("./routes/users"));

module.exports = app;
