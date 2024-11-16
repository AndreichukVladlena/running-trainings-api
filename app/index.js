const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

app.use("/api/user", require("./routes/users"));
app.use("/api/run", require("./routes/runRecords"));
app.use("/api/image", require("./routes/images"));

module.exports = app;
