const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/home", (req, res) => {
  res.render("home.ejs");
});


router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { username, email, password } = req.body;

      const hashpassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        username,
        email,
        password: hashpassword,
      });

      res.redirect("/user/login"); // ✅ register ke baad login pe bhejo

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  [
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      const user = await userModel
        .findOne({ username })
        .select("+password");

      if (!user) {
        return res.status(401).json({
          message: "Invalid Username or Password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Username or Password",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.redirect("/files"); // ✅ login ke baad files pe bhejo

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/user/login");
});

module.exports = router;