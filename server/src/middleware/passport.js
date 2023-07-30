const passport = require("passport");
const dotenv = require("dotenv").config();
const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  googleConfig,
  githubConfig,
  facebookConfig,
  jwtConfig,
} = require("../config/passport.config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new GoogleStrategy(
    googleConfig,
    (accessToken, refreshToken, profile, done) => {
      // Database logic
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    githubConfig,
    (accessToken, refreshToken, profile, done) => {
      // Database logic
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    facebookConfig,
    (accessToken, refreshToken, profile, done) => {
      // Database logic
      done(null, profile);
    }
  )
);

passport.use(
  new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, async (jwt_payload, done) => {
    try {
      const q = 'SELECT * FROM users WHERE id = ?';
      const [rows] = await db.query(q, [jwt_payload.id]);
      if (rows.length !== 0) {
        const user = rows[0];
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const q = `
      SELECT *
      FROM users
      WHERE email = ?
      `;
        const [rows] = await db.query(q, [email]);

        if (rows.length !== 0) {
          const user = rows[0];
          const {
            password: user_password,
            email: user_email,
            id: user_id,
            date_of_birth: user_date_of_birth,
            username: user_username,
          } = user;

          const isPasswordSame = bcrypt.compareSync(password, user_password);

          if (isPasswordSame) {
            const token = jwt.sign(
              {
                id: user_id,
                displayName: user_username,
                email: user_email,
                date_of_birth: user_date_of_birth,
                password: user_password,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );

            return done(null, {
              id: user_id,
              displayName: user_username,
              email: user_email,
              date_of_birth: user_date_of_birth,
              token: token,
            });
          }

          return done(null, false, { message: "Incorrect password!" });
        }

        return done(null, false, { message: "Email does not exist!" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});
