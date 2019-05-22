const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator/check");
const { User, userRegistrationValidator } = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", userRegistrationValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // Check if the user exists
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Server Error");
  }

  // Get users gravatar
  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

  let user = new User({ name, email, avatar, password });

  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Save the user in DB
  await user.save();

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
});

module.exports = router;
