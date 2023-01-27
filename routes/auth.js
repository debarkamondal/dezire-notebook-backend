const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create user using : POST at /api/auth
router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Length must be atleast 5").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    //   res.send(req.body);
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err);
    res.json({error: "Please enter an unique email"})})
  }
);
module.exports = router;
