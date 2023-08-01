const dotenv = require("dotenv").config();
const ExtractJwt = require("passport-jwt").ExtractJwt;

const googleConfig = {
  clientID: process.env.CLIENT_GOOGLE_ID,
  clientSecret: process.env.CLIENT_GOOGLE_SECRET,
  callbackURL: process.env.CALLBACK_GOOGLE_URL,
};

const githubConfig = {
  clientID: process.env.CLIENT_GITHUB_ID,
  clientSecret: process.env.CLIENT_GITHUB_SECRET,
  callbackURL: process.env.CALLBACK_GITHUB_URL,
};

const facebookConfig = {
  clientID: process.env.APP_FACEBOOK_ID,
  clientSecret: process.env.APP_FACEBOOK_SECRET,
  callbackURL: process.env.CALLBACK_FACEBOOK_URL,
  enableProof: true,
};

const jwtConfig = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = {
  googleConfig,
  githubConfig,
  facebookConfig,
  jwtConfig,
};
