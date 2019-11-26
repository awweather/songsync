const AuthController = require("../controllers/AuthController");
const OAuthController = require("../controllers/OAuthController");
const passport = require("passport");

module.exports = app => {

  app.post("/dashboard", AuthController.userLoggedIn);
  app.get("/auth/user", AuthController.userLoggedIn, AuthController.getUser);
  app.post("/auth/register", AuthController.register);
  app.post(
    "/auth/login",
    passport.authenticate("local"), 
    (req, res, next) => {
      console.log(res.redirect);
      res.status(200).send({user: req.user});
    }
  );

  // app.post("/auth/login", AuthController.login);

  app.post(
    "/auth/pandora",
    OAuthController.pandora.login
  );

  app.get("/auth/spotify", OAuthController.spotify.login);
  //auth/spotify/callback doesn't work for some reason
  app.get("/callback", (req, res, next) => {
    OAuthController.spotify.callback(req, res, next);
  });

  app.get("/auth/google", (req, res, next) => {
    OAuthController.google.login(req, res, next);
  });

  app.get("/auth/google/callback", (req, res, next) => {
    OAuthController.google.callback(req, res, next);
  });

  app.get("/auth/amazon", (req, res, next) => {
    OAuthController.amazon.login(req, res, next);
  });

  app.get("/auth/amazon/callback", (req, res, next) => {
    OAuthController.amazon.callback(req, res, next);
  });
  console.log("registered!");
};
