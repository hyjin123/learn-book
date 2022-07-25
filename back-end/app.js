const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
var proxy = require("express-http-proxy");

const app = express();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", proxy("https://hoyeonjin-learnbook.herokuapp.com/"));

const resourcesRouter = require("./routes/resources");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const topicsRouter = require("./routes/topics");
const likesRouter = require("./routes/likes");
const savesRouter = require("./routes/saves");
const profileRouter = require("./routes/profile");
const commentsRouter = require("./routes/comments");

// Routes
app.use("/resources", resourcesRouter(db));
app.use("/login", loginRouter(db));
app.use("/register", registerRouter(db));
app.use("/topics", topicsRouter(db));
app.use("/likes", likesRouter(db));
app.use("/saves", savesRouter(db));
app.use("/profile", profileRouter(db));
app.use("/comments", commentsRouter(db));

module.exports = app;
