const AuthController = require("./controllers/AuthController");
const OAuthController = require("./controllers/OAuthController");

module.exports = app => {
  app.post("/auth/register", AuthController.register);
  app.post("/auth/login", AuthController.login);

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
