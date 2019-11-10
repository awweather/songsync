const AuthController = require('./controllers/AuthController')
const OAuthController = require('./controllers/OAuthController');

module.exports = (app) => {
    app.post('/auth/register', AuthController.register);
    app.post('/auth/login', AuthController.login);
    app.get('/auth/spotify', OAuthController.spotify.login,
    function(req, res) {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
    });
    app.get('/auth/spotify/callback', OAuthController.spotify.callback);
    app.get('/callback', OAuthController.spotify.callback);
    console.log("registered!");
}