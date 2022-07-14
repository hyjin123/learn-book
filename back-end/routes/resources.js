const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get all resources for a topic
  router.get("/", function (req, res) {
    // retrieve the topic
    const topic = req.query.topicId;
    // query the topics for this particular user
    db.query(`SELECT * FROM resources WHERE topic_id = $1;`, [topic])
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => console.log(err));
  });
  // add a resource
  router.post("/add", function (req, res) {
    // retrieve the user id
    const topic = req.body.topicId;
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
  // delete a resource
  router.post("/delete", function (req, res) {
    // retrieve the resource id
    const resourceId = req.body.id;
    console.log(resourceId);
    // delete the resource from the database
    db.query(`DELETE FROM resources WHERE id=$1 RETURNING id;`, [resourceId])
      .then((data) => {
        const resource = data.rows[0];
        res.json({ resource });
      })
      .catch((err) => console.log(err));
  });
  return router;
};
