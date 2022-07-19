const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // retrieve saves
  router.get("/", function (req, res) {
    const resourceId = req.query.id;
    const userId = req.query.userId;
    db.query(`SELECT id FROM saves WHERE resource_id=$1 AND user_id=$2;`, [
      resourceId,
      userId,
    ])
      .then((data) => {
        const saves = data.rows;
        res.json({ saves });
      })
      .catch((err) => console.log(err));
  });

  // toggle saves
  router.post("/", function (req, res) {
    // retrieve the save status
    const save = req.body.save;
    const resourceId = req.body.id;
    const userId = req.body.userId;
    const ownerId = req.body.ownerId;
    // based on the condition of whether it was saved or not, make changes to the database
    if (save) {
      db.query(
        `DELETE FROM saves WHERE resource_id=$1 AND user_id=$2 RETURNING id;`,
        [resourceId, userId]
      )
        .then((data) => {
          const id = data.rows;
          res.json({ id });
        })
        .catch((err) => console.log(err));
    } else {
      db.query(
        `INSERT INTO saves(resource_id, user_id, owner_id) VALUES($1, $2, $3) RETURNING id;`,
        [resourceId, userId, ownerId]
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
