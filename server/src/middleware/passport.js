const passport = require("passport");
const dotenv = require("dotenv").config();
const {
  googleConfig,
  githubConfig,
  facebookConfig,
  jwtConfig
} = require("../config/passport.config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require('passport-jwt').Strategy

passport.use(new GoogleStrategy(googleConfig, (accessToken, refreshToken, profile, done) => {
  // Database logic
  done(null, profile);
}));

passport.use(new GithubStrategy(githubConfig, (accessToken, refreshToken, profile, done) => {
  // Database logic
  done(null, profile)
}))

passport.use(new FacebookStrategy(facebookConfig, (accessToken, refreshToken, profile, done) => {
  // Database logic
  done(null, profile)
}))

passport.use(new JwtStrategy(jwtConfig, (jwt_payload, done) => {
  // Database logic
  done(null, jwt_payload)
}))

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  })
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  })
});
