const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/", function (req, res) {
    // save the login info
    const emailEntered = req.body.email;
    const password1 = req.body.password;
    // check db to compare the email and password
    db.query(`SELECT * FROM users WHERE email = $1;`, [emailEntered])
      .then((data) => {
        console.log(data);
        const email = data.rows[0].email;
        const id = data.rows[0].id;
        const first_name = data.rows[0].first_name;
        const last_name = data.rows[0].last_name;
        const password2 = data.rows[0].password;
        // check if the email and password matches the one in the db
        if (!email) {
          res.status(400).send({ message: "Invalid Email, it does not exist" });
        } else if (bcrypt.compareSync(password1, password2)) {
          //if the password matches using bcrypt
          const userInfo = { id, first_name, last_name, email };
          const accessToken = jwt.sign(
            userInfo,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ accessToken, userInfo });
        } else {
          res
            .status(400)
            .send({ message: "Invalid Password, it does not match" });
        }
      })
      .catch((err) => console.log(err));
  });
  return router;
};
