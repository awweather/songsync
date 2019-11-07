const AuthController = require('./controllers/AuthController')
const OAuthController = require('./controllers/OAuthController');

module.exports = (app) => {
    app.post('/auth/register', AuthController.register);
    app.post('/auth/login', AuthController.login);
    app.get('/oauth/spotify', OAuthController.spotify.login);
    console.log("registered!");
}