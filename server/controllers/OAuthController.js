
const amazonStrategy = require("../strategies/amazonStrategy");
const spotifyStrategy = require("../strategies/spotifyStrategy");
const googleStrategy = require("../strategies/googleStrategy");
const pandoraStrategy = require("../strategies/pandoraStrategy");
const AuthController = require("../controllers/AuthController");

module.exports = {
    spotify: {
        login(req, res) {
          spotifyStrategy.login(req, res);
        },
        callback(req, res) {
          spotifyStrategy.callback(req, res);
        }
    },
    google: {
      login(req, res, next) {
        console.log("google!");
        googleStrategy.login(req, res, next);
      },
      callback(req, res, next){
        console.log("google callback!");
        googleStrategy.callback(req, res, next);
      }
    },
    amazon: {
      login(req, res, next) {
        console.log("amazon!");
        amazonStrategy.login(req, res, next);
      },
      callback (req, res, next) {
        console.log("amazon callback!");
        amazonStrategy.callback(req, res, next);
      }
    },
    pandora: {
      login(req, res, next) {
        console.log("pandora login!");
        pandoraStrategy.login(req, res, next);
      }
    }
}