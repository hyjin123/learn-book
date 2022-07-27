const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/", function (req, res) {
    // insert the register data to the users table in the db
    const { first_name, last_name, email } = req.body;
    // hash the password
    console.log("first name", first_name);
    console.log("email", email);
    console.log("password", req.body.password);
    const password = bcrypt.hashSync(req.body.password, 10);
    // check if email already exists in the database, if so, can't register again
    db.query(`SELECT email FROM users;`)
      .then((data) => {
        console.log(data.rows);
        const allEmails = data.rows;
        // loop through all the emails and if the email exists, send an error saying you can't register
        for (const existingEmail of allEmails) {
          if (email === existingEmail.email) {
            return res
              .status(400)
              .send({ message: "this email already exists!" });
          }
        }
        // if email is open for use, insert into the database and log them in
        const queryParams = [first_name, last_name, email, password];
        db.query(
          `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email;`,
          queryParams
        )
          .then((data) => {
            const id = data.rows[0].id;
            const first_name = data.rows[0].first_name;
            const last_name = data.rows[0].last_name;
            const email = data.rows[0].email;
            const userInfo = { id, first_name, last_name, email };
            // generate and save access token
            const accessToken = jwt.sign(
              userInfo,
              process.env.ACCESS_TOKEN_SECRET
            );
            res.json({ accessToken, userInfo });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
