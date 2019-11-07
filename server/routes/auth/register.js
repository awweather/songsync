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

async function createUser(name, email, password) {
    const users = await loadUsersCollection();
    
    await users.insertOne({
        name: name,
        email: email,
        password: password,
        createdAt: new Date()
    });
}

async function findUserByEmail(email) {
    const users = await loadUsersCollection();
    var query = { email: email }
    return users.findOne(query);
}

async function emailAlreadyExists(email) {
    var user = await findUserByEmail(email);

    return user;
}

async function hashPassword(password){
    var salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Add Post
router.post('/', async (req, res) => {
    
    const  name  =  req.body.name;
    const  email  =  req.body.email;

    try {
        var emailExists = await emailAlreadyExists(email);

        if (emailExists != null && emailExists != undefined){
            res.status(409).send({error: "Email is already in use."});
        } else {
            let password = req.body.password;
            var hash = await hashPassword(password);

            await createUser(name, email, hash);

            var user = await findUserByEmail(email);

            const json = JSON.stringify(user);
            res.status(200).send({ user: json, token: jwtSignUser(user) });
        }
    } catch (err){

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