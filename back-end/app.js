const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");

const app = express();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

// const proxy = require("http-proxy-middleware");
// module.exports = function (app) {
//   // add other server routes to path array
//   app.use(
//     proxy(["/api"], { target: "https://hoyeonjin-learnbook.herokuapp.com" })
//   );
// };

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
const savesRouter = require("./routes/saves");
const profileRouter = require("./routes/profile");
const commentsRouter = require("./routes/comments");

// Routes
app.use("/api/resources", resourcesRouter(db));
app.use("/api/login", loginRouter(db));
app.use("/api/register", registerRouter(db));
app.use("/api/topics", topicsRouter(db));
app.use("/api/likes", likesRouter(db));
app.use("/api/saves", savesRouter(db));
app.use("/api/profile", profileRouter(db));
app.use("/api/comments", commentsRouter(db));

module.exports = app;
