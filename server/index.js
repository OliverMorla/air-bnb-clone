const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();
const cors = require("cors")

const app = express();
const PORT = 5174;

require('./passport')

const member_routes = require("./src/routes/auth_users").auth_users;
const guest_routes = require("./src/routes/public_users").public_users;

app.use(express.json());

app.use(
    session({
        name: "session",
        secret: "googleAuth",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize())
app.use(passport.authenticate('session'))
app.use(passport.session());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/auth", member_routes);
app.use("/", guest_routes);

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT}`);
});

// Export the Express API
module.exports = app;
