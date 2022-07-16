const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // retrieve likes
  router.get("/", function (req, res) {
    const resourceId = req.query.id;
    const userId = req.query.userId;
    db.query(`SELECT id FROM likes WHERE resource_id=$1 AND user_id=$2;`, [
      resourceId,
      userId,
    ])
      .then((data) => {
        const likes = data.rows;
        res.json({ likes });
      })
      .catch((err) => console.log(err));
  });

  // retrieve number of likes for a single resource
  router.get("/count", function (req, res) {
    const resourceId = req.query.id;
    db.query(`SELECT COUNT(*) FROM likes WHERE resource_id=$1;`, [resourceId])
      .then((data) => {
        const likes = data.rows;
        res.json({ likes });
      })
      .catch((err) => console.log(err));
  });

  // toggle likes
  router.post("/", function (req, res) {
    // retrieve the like status
    const like = req.body.like;
    const resourceId = req.body.id;
    const userId = req.body.userId;
    // based on the condition of whether it was liked or not, make changes to the database
    if (like) {
      db.query(
        `DELETE FROM likes WHERE resource_id=$1 AND user_id=$2 RETURNING id;`,
        [resourceId, userId]
      )
        .then((data) => {
          const id = data.rows;
          res.json({ id });
        })
        .catch((err) => console.log(err));
    } else {
      db.query(
        `INSERT INTO likes(resource_id, user_id) VALUES($1, $2) RETURNING id;`,
        [resourceId, userId]
      )
        .then((data) => {
          const id = data.rows;
          res.json({ id });
        })
        .catch((err) => console.log(err));
    }
  });
  return router;
};
