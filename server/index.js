const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 5174;

require("./src/middleware/passport");
require("./src/database/db.js");

const auth_routes = require("./src/routes/auth_users.js");
const public_routes = require("./src/routes/public_users");

app.use(express.json());

app.use(
  session({
    name: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/auth", auth_routes);
app.use("/", public_routes);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

module.exports = app;
