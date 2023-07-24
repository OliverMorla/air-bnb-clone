const express = require("express");
const passport = require("passport");
const regd_users = express.Router();
const dotenv = require("dotenv");
const db = require("../db")

dotenv.config();

regd_users.get("/google", passport.authenticate("google", { scope: ["profile"] }));
regd_users.get("/google/callback",
    passport.authenticate("google", { successRedirect: process.env.CLIENT_URL, failureRedirect: "/login/failed" }),
    function (req, res) {
        res.redirect('')
    }
);

regd_users.get("/facebook", passport.authenticate('facebook'))
regd_users.get('/facebook/callback',
    passport.authenticate("facebook", { successRedirect: process.env.CLIENT_URL, failureRedirect: "/login/failed" }),
    function (req, res) {
        res.redirect('')
    }
);

regd_users.get("/github", passport.authenticate('github'))
regd_users.get('/github/callback',
    passport.authenticate("github", { successRedirect: process.env.CLIENT_URL, failureRedirect: "/login/failed" }),
    function (req, res) {
        res.redirect('')
    }
);

regd_users.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            authenticated: true,
            message: "successfull",
            user: req.user,
        });
    }
});

regd_users.get("/login/failed", (req, res) => {
    res.status(401).json({
        authenticated: false,
        message: "failed",
    });
});

regd_users.post("/login", (req, res, next) => {
    const { email, password } = req.body
    const q = `
    SELECT *
    FROM users
    WHERE email = ?
    `
    db.query(q, [email], (err, results) => {
        if(err) throw err
    }) 

    res.send("You are registered member, hence you can login!");
});

regd_users.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return res.status(404).json({
                message: "Operation failed",
                error: err,
            })
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

regd_users.get("/reserve", (req, res) => {
    res.send("You are authenticated, hence you can reserve!");
});

module.exports.auth_users = regd_users;
