
let amazonStrategy = require("../strategies/amazonStrategy");
let spotifyStrategy = require("../strategies/spotifyStrategy");
let googleStrategy = require("../strategies/googleStrategy");

module.exports = {
    spotify: {
        login(req, res) {
          console.log("spotify!");
          spotifyStrategy.login(req, res);
        },
        callback(req, res) {
          console.log("spotify callback!");
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
    }
}