const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/db");
const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  const { username, email, password, date_of_birth } = await req.body;

  if (username && email && password && date_of_birth) {
    try {
      const q = `
      SELECT *
      FROM users
      WHERE email = ?`;

      const [rows, fields] = await db.execute(q, [email]);

      if (rows.length > 0) {
        throw new Error("Email already exists!");
      }

      try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const values = [username, email, date_of_birth, hashedPassword];
        const q = `
        INSERT INTO users (username, email, date_of_birth, password)
        VALUES (?, ?, ?, ?)
        `;

        const [rows, fields] = await db.execute(q, values);
        return res.status(201).json({
          status: 201,
          message:
            "You've successfully created an account!, you can now log in!",
        });
      } catch (err) {
        return res.status(403).json({ status: 403, message: err.message });
      }
    } catch (err) {
      return res.status(409).json({ status: 409, message: err.message });
    }
  }
});

module.exports = public_users;
