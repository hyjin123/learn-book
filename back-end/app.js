const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "URLs to trust of allow");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Cors Configuration - Start
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });
//Cors Configuration - End
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
