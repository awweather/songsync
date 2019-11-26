const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const dataProvider = require("../providers/DataProvider");
const User = require("../models/User.js");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function(username, password, done) {
      const Users = await dataProvider.getUsers();
      Users.findOne({ email: username }, async function(err, foundUser) {
        console.log("FOUND: " + foundUser.username);
        if (err) {
          return done(err);
        }
        if (!foundUser) {
          return done(null, false);
        }
        
        const user = new User(foundUser);
        const passwordValid = await user.verifyPassword(password);
        console.log(passwordValid);
        if (!passwordValid) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

async function findUserByEmail(email) {
  const users = await dataProvider.getUsers();
  var query = { email: email };
  return users.findOne(query);
}

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

async function createUser(name, email, password) {
  const users = await dataProvider.getUsers();

  await users.insertOne(
    new User({
      username: name,
      email: email,
      password: password,
      createdAt: new Date(),
      linkedAccounts: new Map()
    })
  );
}

async function emailAlreadyExists(email) {
  var user = await findUserByEmail(email);

  return user;
}

async function hashPassword(password) {
  var salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  async getUser(req, res) {
    console.log("getuser")
    // The purpose of this is to return the user object once a user connects with spotify
    // but really we should only send the linked accounts and not the whole user object
    // the front end only needs to know that a token exists, not what the token is
    if (req.session.passport.user){
      res.status(200).send({user: req.session.passport.user})
    } else {
      res.redirect("http://localhost:8080/#/login");
    }
  },
  async login(req, res) {
    console.log("login");
    const { email, password } = req.body;
    localStrategy.login({ email, password });
  },
  userLoggedIn (req, res, next) {
    console.log("Req.passport: " + req.passport);
    console.log(req.session.passport);
    if (req.session.passport && req.session.passport.user) {
      next();
    }
  },
  async register(req, res) {
    const name = req.body.username;
    const email = req.body.email;

    try {
      var emailExists = await emailAlreadyExists(email);

      if (emailExists != null && emailExists != undefined) {
        res.status(409).send({ error: "Email is already in use." });
      } else {
        let password = req.body.password;
        var hash = await hashPassword(password);

        await createUser(name, email, hash);

        var user = await findUserByEmail(email);

        const json = JSON.stringify(user);
        res.status(200).send({ user: json, token: jwtSignUser(user) });
      }
    } catch (err) {
      console.log(err);
    }
  },
  verifyToken(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, config.authentication.jwtSecret, (err, decoded) => {
        console.log(decoded);

        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: "Auth token is not supplied"
      });
    }
  },
  index(req, res) {
    res.json({
      success: true,
      message: "Index page"
    });
  }
};
