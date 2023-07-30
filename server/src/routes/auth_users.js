const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const db = require("../database/db");
const jwt = require("jsonwebtoken");

const auth_users = express.Router();

auth_users.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

auth_users.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

auth_users.get("/facebook", passport.authenticate("facebook"));

auth_users.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

auth_users.get("/github", passport.authenticate("github"));

auth_users.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

auth_users.get("/login/success", (req, res) => {
  if (req.user) {
    return res.status(200).json({
      authenticated: true,
      message: "You are logged in!",
      user: req.user,
    });
  }
  res.redirect("/auth/login/failed");
});

auth_users.get("/profile", passport.authenticate("jwt", {session: false}), (req, res, next) => {
  res.status(200).json({status: 200, message: "Only authenticated users can view this", user: req.user})
})

auth_users.get("/login/failed", (req, res) => {
  return res.status(401).json({
    authenticated: false,
    message: "You are not logged in!",
  });
});

auth_users.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

auth_users.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
    return res.status(200).json({
      status: 200,
      message: "You are now logged out!",
      user: req.user,
    });
  });
});

auth_users.post("/stripe/create-checkout-session", async (req, res) => {
  const {
    number_of_guest,
    number_of_nights,
    checkInDate,
    checkOutDate,
    price,
    name,
  } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: price * 100,
        },
        quantity: number_of_nights,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/reserve-sucess`,
    cancel_url: `${process.env.CLIENT_URL}/reserve-failed`,
  });

  res.send({ url: session.url });
});

module.exports = auth_users;
