const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt'); 
const config = require('../config/config.js')
const dataProvider = require('../providers/DataProvider');
const User = require('../models/User.js');

async function findUserByEmail(email) {
    const users = await dataProvider.getUsers();
    var query = { email: email }
    return users.findOne(query);
}

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: ONE_WEEK });
}

async function createUser(name, email, password) {
    const users = await dataProvider.getUsers();
    
    await users.insertOne(new User({
        username: name,
        email: email,
        password: password,
        createdAt: new Date(),
        linkedAccounts: new Map()
    }));
}

async function emailAlreadyExists(email) {
    var user = await findUserByEmail(email);

    return user;
}

async function hashPassword(password){
    var salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    async login (req, res) {
        console.log("login");
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
    },
    async register (req, res) {
        const name = req.body.username;
        const email = req.body.email;
    
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
            console.log(err);
        }
    }
}