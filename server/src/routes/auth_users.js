const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../database/db");
const bodyParser = require("body-parser");
const auth_users = express.Router();

// Temporary stripeSession used to store checkout info.
let stripeSession = {};

// checkAuthentication function to see if session is still avaible.
const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(401), json({ status: 401, message: "You are not authenticated!" });
};

// Google OAuth2
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

// Facebook OAuth2
auth_users.get("/facebook", passport.authenticate("facebook"));

auth_users.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// Github OAuth2
auth_users.get("/github", passport.authenticate("github"));

auth_users.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

auth_users.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      status: 200,
      message: "Only authenticated users can view this",
      user: req.user,
    });
  }
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

auth_users.get("/login/failed", (req, res) => {
  if (req.user === undefined) {
    return res.status(401).json({
      authenticated: false,
      message: "You are not logged in!",
    });
  }
  res.redirect("/auth/login/success");
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

// Stripe & Stripe Checkout Routes
auth_users.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const { type } = req.body;
    const {
      user_id,
      number_of_guest,
      number_of_nights,
      checkInDate,
      checkOutDate,
      name,
      price,
    } = stripeSession;

    switch (type) {
      case "checkout.session.completed":
        const q = `
        INSERT into orders (user_id, number_of_nights, number_of_guest, check_in_date, check_out_date, room_name, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          user_id,
          number_of_nights,
          number_of_guest,
          checkInDate,
          checkOutDate,
          name,
          price,
        ];

        const [rows, fields] = await db.execute(q, values);
        return res
          .status(201)
          .json({ status: 201, message: "You have successfully made the reservation/Data is also stored in DB!" });
    }
  }
);

auth_users.post("/stripe/create-checkout-session", async (req, res) => {
  const {
    user_id,
    number_of_nights,
    number_of_guest,
    checkInDate,
    checkOutDate,
    name,
    price,
  } = req.body;

  stripeSession = {
    user_id,
    number_of_nights,
    number_of_guest,
    checkInDate,
    checkOutDate,
    name,
    price,
  };

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
    success_url: `${process.env.CLIENT_URL}/reserve-success`,
    cancel_url: `${process.env.CLIENT_URL}/reserve-failed`,
  });

  res.send({ url: session.url });
});

// Stripe Orders Routes
auth_users.post("/orders", async (req, res) => {
  const { user_id } = await req.body;
  try {
    const q = `
    SELECT *
    FROM orders
    WHERE user_id = ?;
    `;
    const [rows, fields] = await db.execute(q, [user_id]);
    return res.status(200).json({ status: 200, orders: rows });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = auth_users;
