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

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const resourcesRouter = require("./routes/resources");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resources", resourcesRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

module.exports = app;
