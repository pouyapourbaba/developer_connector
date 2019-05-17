const mongoose = require("mongoose");
const { check } = require("express-validator/check");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const userRegistrationValidator = [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("email", "Please include a valide email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more character"
  ).isLength({ min: 6 })
];

const userAuthenticationValidator = [
  check("email", "Please include a valide email").isEmail(),
  check("password", "Password is required").exists()
];

module.exports.User = mongoose.model("user", UserSchema);
module.exports.userRegistrationValidator = userRegistrationValidator;
module.exports.userAuthenticationValidator = userAuthenticationValidator;
