const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", function (req, res) {
    // retrieve the user id
    const userId = req.body.id;
    // query the topics for this particular user
    db.query(`SELECT * FROM topics WHERE user_id = $1;`, [userId])
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => console.log(err));
  });
  return router;
};
