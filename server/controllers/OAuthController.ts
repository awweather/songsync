const amazonStrategy = require("../strategies/amazonStrategy");
const spotifyStrategy = require("../strategies/spotifyStrategy");
const googleStrategy = require("../strategies/googleStrategy");
const pandoraStrategy = require("../strategies/pandoraStrategy");
const AuthController = require("../controllers/AuthController");

class OAuthController {
  public spotify: any;
  public google: any;
  public pandora: any;
  public amazon: any;

  constructor() {
    this.spotify = {
      login: spotifyStrategy.login,
      callback: spotifyStrategy.callback
    };

    this.google = {
      login: googleStrategy.login,
      callback: googleStrategy.callback
    };

    this.amazon = {
      login: amazonStrategy.login,
      callback: amazonStrategy.callback
    };

    this.pandora = {
      login: pandoraStrategy.login
    };
  }
}

export default new OAuthController()
