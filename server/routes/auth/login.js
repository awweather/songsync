const express = require('express');
const mongodb = require('mongodb');
const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt'); 
const router = express.Router();
const config = require('../../config/config.js')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: ONE_WEEK });
}

async function findUserByEmail(email) {
    const users = await loadUsersCollection();
    var query = { email: email }
    return users.findOne(query);
}

// Add Post
router.post('/', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await findUserByEmail(email);
        
        if (!user){
            return res.status(403).send({error: 'The information provided was incorrect'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            return res.status(403).send({error: 'The information provided was incorrect'});
        }
        const json = JSON.stringify(user);
        
        res.send({ user: json, token: jwtSignUser(user) });

    } catch (err) {
        res.status(500).send({error: 'An error occured trying to log in'});
        console.log(err);
    }
});
  

async function getClient(){
    if (process.env.NODE_ENV === 'production'){
        return await mongodb.MongoClient.connect('mongodb+srv://awweather:NOuHg9S4fWNYdDbE@cluster0-eqqtu.azure.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    } else {
        return await mongodb.MongoClient.connect('mongodb://localhost', {
            useNewUrlParser: true
        });
    }
}

async function loadUsersCollection() {
    const client = await getClient();
    
    var db = client.db('vue-express').collection('users');
    if (db){
        return db
    } else {
        client.db('vue-express').createCollection('users');
        return client.db('vue-express').collection('users');
    }
}

module.exports = router;