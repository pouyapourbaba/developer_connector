const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator/check");
const { User, userAuthenticationValidator } = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", auth, async (req, res) => {
  console.log("route")
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (ex) {
    console.error(ex);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post("/", userAuthenticationValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if the user exists
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    // Compare the raw password to the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    // Return JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = await jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 36000
    });

    res.json({ token });
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
