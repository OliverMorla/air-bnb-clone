const passport = require("passport");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_GOOGLE_ID,
  clientSecret: process.env.CLIENT_GOOGLE_SECRET,
  callbackURL: process.env.CALLBACK_GOOGLE_URL,
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

passport.use(new GithubStrategy({
  clientID: process.env.CLIENT_GITHUB_ID,
  clientSecret: process.env.CLIENT_GITHUB_SECRET,
  callbackURL: process.env.CALLBACK_GITHUB_URL
}, function (accessToken, refreshToken, profile, done) {
  // Database logic
  done(null, profile)
}))

passport.use(new FacebookStrategy({
  clientID: process.env.APP_FACEBOOK_ID,
  clientSecret: process.env.APP_FACEBOOK_SECRET,
  callbackURL: process.env.CALLBACK_FACEBOOK_URL,
  enableProof: true
}, function (accessToken, refreshToken, profile, done) {
  // Database logic
  done(null, profile)
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
