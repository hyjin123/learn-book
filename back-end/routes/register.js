const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", function (req, res) {
    // insert the register data to the users table in the db
    const first_name = req.body.first_name;
    console.log(req.body.first_name);
    console.log(req.body.email);
    res.json({ first_name });
  });
  return router;
};
