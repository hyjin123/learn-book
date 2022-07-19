const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // retrieve all comments
  router.get("/", function (req, res) {
    const resourceId = req.query.resourceId;
    db.query(
      `SELECT comments.id, user_id, parent_id, comment, resource_id, posted_date, first_name, last_name FROM comments 
    JOIN users ON users.id = user_id
    WHERE resource_id=$1;`,
      [resourceId]
    )
      .then((data) => {
        const comments = data.rows;
        res.json({ comments });
      })
      .catch((err) => console.log(err));
  });

  return router;
};
