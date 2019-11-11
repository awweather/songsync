const express = require("express"),
  passport = require("passport"),
  util = require("util"),
  SpotifyStrategy = require("passport-spotify").Strategy;

const SPOTIFY_CLIENT_ID = "4197a6642f7443508c00a17b38a62131";
const SPOTIFY_CLIENT_SECRET = "829da8a3b44f49cf8f3e511a8debd996";

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, accessToken);
      });
    }
  )
);

module.exports = {
  login(req, res, next) {
    passport.authenticate(
      "spotify",
      { scope: ["user-read-email", "user-read-private"] },
      function(err, user, info) {
        console.log("user");
        if (err) {
          return res.status(401).json(err);
        }
        if (user) {
          const token = user.generateJwt();
          return res.status(200).json({
            token: token
          });
        } else {
          res.status(401).json(info);
        }
      }
    )(req, res, next);
  },
  callback(req, res, next) {
    console.log("SPOTIFY callback!");
    passport.authenticate(
      "spotify",
      { successRedirect: "/#/services", failureRedirect: "/login" },
      function(err, accessToken, info) {
        if (err) {
          return res.status(401).json(err);
        }
        if (accessToken) {
          return res.status(200).redirect("http://localhost:8080/#/services?accessToken=" + accessToken);
        }
      }
    )(req, res, next);
  }
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
