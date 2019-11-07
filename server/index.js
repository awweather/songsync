const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');

const app = express();
//Middle ware
app.use(bodyParser.json());
app.use(cors());

//Custom configs
//These should go in a .env file
process.env.SPOTIFY_CLIENT_ID = "4197a6642f7443508c00a17b38a62131";
process.env.SPOTIFY_CLIENT_SECRET = "829da8a3b44f49cf8f3e511a8debd996";
process.env.DB_NAME = "vue-express";

require('./routes.js')(app);

//Handle Prod
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'));

    //Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
