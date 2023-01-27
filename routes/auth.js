const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create user using : POST at /api/auth
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Length must be atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      //   res.send(req.body);
    }

    //checking if the user already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log(user);
        return res.status(400).json({ error: req.body.email });
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
module.exports = router;
