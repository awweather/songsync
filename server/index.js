const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const passport = require('passport')
const app = express();
const session = require("express-session");
const errorhandler = require('errorhandler');

app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).

app.use(function(err, req, res, next) {
    console.log(err);
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
         res.send(200);
     } else {
         next();
     }
    });
    
    
//Middle ware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //console.log(user);
  done(null, obj);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var allowedOrigins = ["http://localhost:8080", "http://localhost:8888"];

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());

//Custom configs
//These should go in a .env file
process.env.DB_NAME = "vue-express";

require('./routes/routes.js')(app);

//Handle Prod
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'));

    //Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
} else {
    app.use(errorhandler({ log: errorNotification }));
}

function errorNotification (err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
    console.log(title);
    console.log(str);
    console.log(err);
    // notifier.notify({
    //   title: title,
    //   message: str
    // })
  }

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`Server started on port ${port}`));
