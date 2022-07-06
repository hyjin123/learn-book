const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", function (req, res) {
    // save the query into a date variable, 2021-01-20
    res.render("index", { title: "Express" });

    return router;
  });
};
