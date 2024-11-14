const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

async function create(username, password) {
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
  return await User.create({ username, password: hashedPassword });
}

async function readUserByUsername(username) {
  return await User.findOne({ username });
}

async function readUserById(id) {
  return await User.findById(id);
}

async function update(id, updates) {
  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, bcryptSalt);
  }
  return await User.findByIdAndUpdate(id, updates, { new: true });
}

async function remove(id) {
  return await User.findByIdAndDelete(id);
}

function validatePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, {});
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  create,
  readUserByUsername,
  readUserById,
  update,
  remove,
  validatePassword,
  generateToken,
  verifyToken,
};
