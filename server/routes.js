const AuthController = require('./controllers/AuthController')
const OAuthController = require('./controllers/OAuthController');

module.exports = (app) => {
    app.post('/auth/register', AuthController.register);
    app.post('/auth/login', AuthController.login);
    app.get('/auth/spotify', OAuthController.spotify.login);
    app.get('/auth/spotify/callback', OAuthController.spotify.callback);
    app.get('/callback', OAuthController.spotify.callback);
    
    app.get('/auth/google', OAuthController.google.login);
    app.get('/auth/google/callback', OAuthController.google.callback);
    console.log("registered!");
}