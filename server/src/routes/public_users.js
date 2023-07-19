const express = require("express");
const public_users = express.Router();

public_users.get("/register", (req, res) => {
  res.send("You are a public user, hence you can register!");
});

module.exports.public_users = public_users;
