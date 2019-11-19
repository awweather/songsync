const request = require("request"),
  querystring = require("querystring");

module.exports = {
  login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const options = {
      method: "POST",
      url: "https://www.pandora.com/api/v1/auth/login",
      headers: {
        Cookie:
          "wrt=166645577_1bqhjniulk3v2jakhhhoej37i8; v2regbstage=; csrftoken=6ae0da6c8c1a49a5; at=wgkHSOtb56+yTQPuUPlPBc46LS4y2/guZV7Gm2/SguYRF0bLh5ijIA4uRM0POFArHN1p126cjZfw=; wrt=",
        Host: "www.pandora.com",
        "X-CSRFToken": "6ae0da6c8c1a49a5",
        "Content-Type": "application/json"
      },
      body: { password: password, username: username },
      json: true
    };
    request(options, function(error, response, body) {
      if (!error)
        res.status(200).send({accessToken: body.authToken});
    });
  },
  callback(req, res, next) {}
};
