const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "874889913027-3eb7g79km0fekdqlo0tejqmqloluhfmm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "prkPq7Xs0jaAriLMUxS8dZot";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        console.log("next-tick");
        return done(null, accessToken);
      });
    }
  )
);

module.exports = {
  login(req, res, next) {
    passport.authenticate(
      "google",
      {
        scope: [
          "https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"
        ]
      },
      function(err, user, info) {
        if (err) {
          return res.status(401).json(err);
        }
        console.log(user);
        console.log(info);
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
    console.log("GOOGLE callback!");
    passport.authenticate(
      "google",
      { successRedirect: "/#/dashboard", failureRedirect: "/login" },
      function(err, accessToken, info) {
        if (err) {
          return res.status(401).json(err);
        }
        if (accessToken) {
          return res.status(200).redirect("http://localhost:8080/#/dashboard?accessToken=" + accessToken);
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
