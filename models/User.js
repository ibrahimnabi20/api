/**
 * User Model
 * Defines the schema for registered users
 *
 * @property {String} email - User's email (unique)
 * @property {String} password - Hashed user password
 */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
