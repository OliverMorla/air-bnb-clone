const express = require('express');
const regd_users = express.Router();

regd_users.get("/", (req, res) => {
    res.send('You are authenticated!')
})

regd_users.get("/reserve", (req, res) => {
    res.send('You are authenticated, hence you can reserve!')
})

regd_users.get("/login", (req, res, next) => {
    res.send("You are registered member, hence you can login!")
})

module.exports.auth_users = regd_users