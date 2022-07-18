const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // retrieve first and last name of the user for the profile
  router.get("/", function (req, res) {
    const userId = req.query.userInfo;
    db.query(`SELECT first_name, last_name FROM users WHERE users.id=$1;`, [
      userId,
    ])
      .then((data) => {
        const name = data.rows;
        res.json({ name });
      })
      .catch((err) => console.log(err));
  });

  return router;
};
