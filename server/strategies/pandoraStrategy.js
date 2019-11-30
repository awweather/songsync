const request = require("request");

module.exports = {
  login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const options2 = {
      method: "GET",
      url: "https://www.pandora.com/",
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    };

    request(options2, function(error, response, body) {
      const cookie = response['headers']['set-cookie'][1];
      const csrftoken = cookie.substr(cookie.indexOf('=') + 1, 16);
      const options = {
        method: "POST",
        url: "https://www.pandora.com/api/v1/auth/login",
        headers: {
          Cookie: `v2regbstage=; ${cookie}`,
          "X-CSRFToken": `${csrftoken}`,
          "Content-Type": "application/json"
        },
        body: { password: password, username: username },
        json: true
      };
      request(options, function(error, response, body) {
        if (!error)
          req.user.linkedAccounts.pandora = body.authToken;
          res.status(200).send({accessToken: body.authToken});
      });
    });
  }
};
