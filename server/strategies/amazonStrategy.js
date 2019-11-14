const passport = require("passport"),
  AmazonStrategy = require("passport-amazon").Strategy,
  LinkedAccount = require("../models/LinkedAccount");

var AMAZON_CLIENT_ID =
  "amzn1.application-oa2-client.0b750212391141009e0dbdcba9f60757";
var AMAZON_CLIENT_SECRET =
  "bb33c7ae3241b8d85cc97bb0a6e5876d65bcd1d843417bb3c0b74be9b3afdbdc";

passport.use(
  new AmazonStrategy(
    {
      clientID: AMAZON_CLIENT_ID,
      clientSecret: AMAZON_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/amazon/callback"
    },
    function(accessToken, refreshToken, profile, actualProfile, done) {
      var linkedAccount = new LinkedAccount({
        service: "Amazon",
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
      process.nextTick(function() {
        return done(null, accessToken);
      });
    }
  )
);

module.exports = {
  login(req, res, next) {
    passport.authenticate("amazon", { scope: "profile" }, function(
      err,
      user,
      info
    ) {
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
    })(req, res, next);
  },
  callback(req, res, next) {
    console.log("amazon callback!");
    passport.authenticate(
      "amazon",
      { successRedirect: "/#/services", failureRedirect: "/login" },
      function(err, user, info) {
        if (err) {
          return res.status(401).json(err);
        }
        if (user) {
          return res.status(200).redirect("http://localhost:8080/#/services");
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
