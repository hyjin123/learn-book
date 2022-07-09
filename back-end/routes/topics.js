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

  router.post("/", function (req, res) {
    // retrieve the user id and topic
    const userId = req.body.user.id;
    const topic = req.body.topic;
    // query the topics for this particular user
    db.query(
      `INSERT INTO topics (user_id, name) VALUES ($1, $2) RETURNING name;`,
      [userId, topic]
    )
      .then((data) => {
        const topic = data.rows[0];
        res.json({ topic });
      })
      .catch((err) => console.log(err));
  });
  return router;
};
