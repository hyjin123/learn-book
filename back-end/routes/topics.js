const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // retrive all topics
  router.get("/", function (req, res) {
    // retrieve the user id and turn it from a string to a number
    const userId = parseFloat(req.query.userInfo);
    // query the topics for this particular user
    db.query(`SELECT * FROM topics WHERE user_id = $1;`, [userId])
      .then((data) => {
        const topics = data.rows;
        res.json({ topics });
      })
      .catch((err) => console.log(err));
  });

  // add a new topic
  router.post("/", function (req, res) {
    // retrieve the user id and topic
    const userId = req.body.userInfo;
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

  // delete a topic
  router.post("/delete", function (req, res) {
    // retrieve the user id and topic
    const userId = req.body.userInfo;
    const topic = req.body.selectedTopic;
    // query the topics for this particular user
    db.query(`DELETE FROM topics WHERE user_id=$1 AND name=$2 RETURNING id;`, [
      userId,
      topic,
    ])
      .then((data) => {
        const topic = data.rows[0];
        res.json({ topic });
      })
      .catch((err) => console.log(err));
  });
  return router;
};
