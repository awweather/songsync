
var express = require('express'),
session = require('express-session'),
passport = require('passport'),
swig = require('swig'),
SpotifyStrategy = require('../routes/passport/spotify/index').Strategy;
let request = require('request')

let querystring = require('querystring')

var app = express();
var appKey = process.env.SPOTIFY_CLIENT_ID;
var appSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
passport.use(
  new SpotifyStrategy(
    {
      clientID: appKey,
      clientSecret: appSecret,
      callbackURL: 'http://localhost:8888/auth/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      console.log("test");
      process.nextTick(function() {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(__dirname + '/public'));
//   app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
//   });
  
  //app.listen(8888);

  // GET /auth/spotify/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request. If authentication fails, the user will be redirected back to the
  //   login page. Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.

  
  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed. Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
var redirect_uri = 'http://localhost:8888/callback';

module.exports = {
    spotify: {
        login(req, res) {
          console.log("spotify!");
          //This isn't working
          // passport.authenticate('spotify', {
          //       scope: ['user-read-email', 'user-read-private'],
          //       showDialog: true
          //     });
          res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: 'user-read-private user-read-email',
            redirect_uri
          }))
        },
        callback(req, res) {
          console.log("spotify callback!");
          let code = req.query.code || null
          let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
              ).toString('base64'))
            },
            json: true
          }
          request.post(authOptions, function(error, response, body) {
            var access_token = body.access_token
            let uri = process.env.FRONTEND_URI || 'http://localhost:8080/#/services'
            res.redirect(uri + '?access_token=' + access_token)
          })
          
          //This isn't working
          // passport.authenticate('spotify', { successRedirect: '/login', failureRedirect: '/login' }),
          //   function(req, res) {
          //     res.redirect('/');
          //   }
        }
    }
}