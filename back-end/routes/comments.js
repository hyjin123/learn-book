const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // TEST
  router.get("/test", function (req, res) {
    res.json({ hello: "hello" });
  });
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

  // insert new comment
  router.post("/", function (req, res) {
    const text = req.body.text;
    const parentId = req.body.parentId;
    const resourceId = req.body.resourceId;
    const userId = req.body.userId;
    const date = new Date();
    db.query(
      `INSERT INTO comments(resource_id, user_id, parent_id, posted_date, comment)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [resourceId, userId, parentId, date, text]
    )
      .then((data) => {
        const commentId = data.rows[0].id;
        db.query(
          `SELECT comments.id, user_id, parent_id, comment, resource_id, posted_date, first_name, last_name FROM comments
        JOIN users ON users.id = user_id
        WHERE comments.id=$1;`,
          [commentId]
        )
          .then((data) => {
            const comment = data.rows;
            res.json({ comment });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  // delete a comment
  router.post("/delete", function (req, res) {
    const commentId = req.body.commentId;
    db.query(
      `DELETE FROM comments 
    WHERE id=$1 RETURNING *;`,
      [commentId]
    )
      .then((data) => {
        const comment = data.rows;
        res.json({ comment });
      })
      .catch((err) => console.log(err));
  });

  // update a comment
  router.post("/update", function (req, res) {
    const commentId = req.body.commentId;
    const text = req.body.text;
    db.query(
      `UPDATE comments
      SET comment = $1
      WHERE comments.id = $2
      RETURNING *;`,
      [text, commentId]
    )
      .then((data) => {
        const comment = data.rows;
        res.json({ comment });
      })
      .catch((err) => console.log(err));
  });
  return router;
};
