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
  // add a resource
  router.post("/add", function (req, res) {
    // retrieve the user id
    const topic = req.body.selectedTopic;
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    // insert the resource into the table
    db.query(
      `INSERT INTO resources (topic_id, name, description, link)
    VALUES ($1, $2, $3, $4) RETURNING id;`,
      [topic, name, description, url]
    )
      .then((data) => {
        const resource = data.rows[0];
        res.json({ resource });
      })
      .catch((err) => console.log(err));
  });
  return router;
};
