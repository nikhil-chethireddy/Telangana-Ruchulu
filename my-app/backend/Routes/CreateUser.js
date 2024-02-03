const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secureKey = process.env.secureKey;

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Minimum Length of password is 6 Characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPwd = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPwd,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log("error in creating user:", error);
      res.json({ success: fasle });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Minimum Length of password is 6 Characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try login with correct Credentials." });
      }

      const compPwd = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!compPwd) {
        return res.status(400).json({ errors: "Incorrect Password." });
      }

      const payLoad = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(payLoad, secureKey);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log("error in creating user:", error);
      res.json({ success: fasle });
    }
  }
);

module.exports = router;
