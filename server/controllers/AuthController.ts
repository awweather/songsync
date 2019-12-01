import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../config/config.js";
import dataProvider from "../providers/DataProvider";
import User from "../models/User";
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

class AuthController {
  constructor() {
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
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      console.log(this);
      var emailExists = await this.emailAlreadyExists(email);

      if (emailExists != null && emailExists != undefined) {
        res.status(409).send({ error: "Email is already in use." });
      } else {
        const hash = await this.hashPassword(password);

        await this.createUser(username, email, hash);

        const user = await this.findUserByEmail(email);

        const json = JSON.stringify(user);
        res.status(200).send({ user: json, token: this.jwtSignUser(user) });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async findUserByEmail(email) {
    const users = await dataProvider.getUsers();
    var query = { email: email };
    return users.findOne(query);
  }

  jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    });
  }

  async createUser(name, email, password) {
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

  async emailAlreadyExists(email) {
    var user = await this.findUserByEmail(email);

    return user;
  }

  async hashPassword(password) {
    var salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async getUser(req, res) {
    console.log("getuser");
    // The purpose of this is to return the user object once a user connects with spotify
    // but really we should only send the linked accounts and not the whole user object
    // the front end only needs to know that a token exists, not what the token is
    if (req.session.passport.user) {
      res.status(200).send({ user: req.session.passport.user });
    } else {
      res.redirect("http://localhost:8080/#/login");
    }
  }

  userLoggedIn(req, res, next) {
    console.log("Req.passport: " + req.passport);
    console.log(req.session.passport);
    if (req.session.passport && req.session.passport.user) {
      next();
    }
  }
}

export default new AuthController();
