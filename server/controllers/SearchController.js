module.exports = {
    async search (req, res) {
        console.log("login");
        const {email, password} = req.body;
        try {
            res.redirect('https://api.spotify.com/v1/search?' +
            querystring.stringify({
              scope: "https://www.googleapis.com/auth/androidpublisher",
              access_type: "offline",
              response_type: 'code',
              client_id: process.env.GOOGLE_CLIENT_ID,
              redirect_uri: google_redirect_uri
            }))
    
        } catch (err) {
            res.status(500).send({error: 'An error occured trying to log in'});
            console.log(err);
        }
    }
}