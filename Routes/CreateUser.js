const express = require("express");
const router = express.Router();
const User = require("../users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "AnandUmbarkar";

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);
    
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }

      await User.create({
        name: req.body.name,
        password: secpassword,
        phone: req.body.phone,
        email: req.body.email,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post(
  "/signin",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userdata = await User.findOne({ email: req.body.email });
      if (!userdata) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      const pwdcmp = await bcrypt.compare(req.body.password, userdata.password);
      if (!pwdcmp) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
