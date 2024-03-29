const express = require("express");
const router = express.Router();
const getMetaData = require("metadata-scraper");

module.exports = (db) => {
  // get all resources for a topic
  router.get("/", function (req, res) {
    // retrieve the topic
    const topic = req.query.topicId;
    // query the topics for this particular user
    db.query(
      `SELECT resources.id AS id, topic_id, resources.name AS name, description, link, first_name, last_name, users.id AS userid FROM resources 
    JOIN topics ON topics.id = topic_id
    JOIN users ON users.id = user_id
    WHERE topic_id = $1;`,
      [topic]
    )
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => console.log(err));
  });
  // get all SAVED resources for a user
  router.get("/saved", function (req, res) {
    // retrieve the user ID
    const userId = req.query.userInfo;
    // query the saved resources for this particular user
    db.query(
      `SELECT resources.id, topic_id, resources.name, description, link, users.id AS userid, owner_id as ownerid, first_name, last_name FROM resources 
      JOIN saves ON resources.id = resource_id
      JOIN users ON users.id = owner_id
      WHERE user_id = $1;`,
      [userId]
    )
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => console.log(err));
  });
  // get all resources based on user's search value (explore page)
  router.get("/search", function (req, res) {
    // retrieve the topic
    const resourceName = req.query.search;
    // query the search
    db.query(
      `SELECT resources.id, topic_id, resources.name, description, link, users.id AS userid, first_name, last_name FROM resources 
      JOIN topics ON topics.id = topic_id 
      JOIN users ON users.id = user_id
      WHERE LOWER(resources.name) LIKE LOWER($1);`,
      [`%${resourceName}%`]
    )
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => console.log(err));
  });

  router.get("/opengraph", function (req, res) {
    const url = req.query.url;

    getMetaData(url)
      .then((data) => {
        console.log(data);
        res.json({ data });
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
    console.log("this is it, no?!?!", req.body, req.body.add);
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

  // edit a resource
  router.post("/edit", function (req, res) {
    // retrieve the user id
    const topic = req.body.topicId;
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const resourceId = req.body.resourceId;
    // edit the resource in the table
    db.query(
      `UPDATE resources 
      SET topic_id = $1,
          name = $2,
          description = $3,
          link = $4
          WHERE resources.id = $5
          RETURNING id;`,
      [topic, name, description, url, resourceId]
    )
      .then((data) => {
        const resource = data.rows[0];
        res.json({ resource });
      })
      .catch((err) => console.log(err));
  });

  return router;
};
