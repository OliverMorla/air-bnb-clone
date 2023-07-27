const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const db = require("../database/db");

const auth_users = express.Router();

auth_users.get("/google", passport.authenticate("google", { scope: ["profile"] })
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
  }),
);

auth_users.get("/github", passport.authenticate("github"));

auth_users.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
);

auth_users.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      authenticated: true,
      message: "successfull",
      user: req.user,
    });
  }
});

auth_users.get("/login/failed", (req, res) => {
  res.status(401).json({
    authenticated: false,
    message: "failed",
  });
});

auth_users.post("/login", async (req, res, next) => {
  const { email, password } = await req.body;
  try {
    const q = `
      SELECT *
      FROM users
      WHERE email = ?
      `;
    const [rows] = await db.query(q, [email]);

    if (rows.length !== 0) {
      const user = rows[0];
      const { password: user_password, email: user_email } = user;
      const isPasswordSame = undefined;

      if (isPasswordSame) {
        return res.status(200).json({ status: 200, message: "You are now logged in!" })
      }
      return res.status(403).json({ status: 403, message: "Incorrect password!" })
    }
    return res.status(404).json({ status: 404, message: "Email does not exist!" })
  } catch (err) {
    console.log(err.message)
  }
});

auth_users.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(404).json({
        message: "Operation failed",
        error: err.message,
      });
    }
    res.redirect(process.env.CLIENT_URL);
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

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

module.exports = auth_users;
