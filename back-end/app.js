const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const resourcesRouter = require("./routes/resources");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const topicsRouter = require("./routes/topics");
const likesRouter = require("./routes/likes");

// Routes
app.use("/resources", resourcesRouter(db));
app.use("/login", loginRouter(db));
app.use("/register", registerRouter(db));
app.use("/topics", topicsRouter(db));
app.use("/likes", likesRouter(db));

module.exports = app;
