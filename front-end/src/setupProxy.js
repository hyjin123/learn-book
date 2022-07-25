const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");

const app = express();
// place in src with index.js no need to import anywhere
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // add other server routes to path array
  app.use(
    proxy(["/api"], { target: "https://hoyeonjin-learnbook.herokuapp.com" })
  );
};
