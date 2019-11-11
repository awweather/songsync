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

// passport.serializeUser(function(user, done) {
//   console.log(user);
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   //console.log(user);
//   done(null, obj);
// });

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

// app.use(cors({
//     origin: function(origin, callback) {
         
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//     }
// }));

//Custom configs
//These should go in a .env file
process.env.SPOTIFY_CLIENT_ID = "4197a6642f7443508c00a17b38a62131";
process.env.SPOTIFY_CLIENT_SECRET = "829da8a3b44f49cf8f3e511a8debd996";
process.env.DB_NAME = "vue-express";
process.env.GOOGLE_CLIENT_ID = "874889913027-3eb7g79km0fekdqlo0tejqmqloluhfmm.apps.googleusercontent.com";
process.env.GOOGLE_CLIENT_SECRET = "prkPq7Xs0jaAriLMUxS8dZot";

process.env.AMAZON_CLIENT_ID = "amzn1.application-oa2-client.0b750212391141009e0dbdcba9f60757";
process.env.AMAZON_CLIENT_SECRET = "bb33c7ae3241b8d85cc97bb0a6e5876d65bcd1d843417bb3c0b74be9b3afdbdc";

require('./routes.js')(app);

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
