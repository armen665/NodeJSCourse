const express = require('express');
const jwt = require('jsonwebtoken');

const { users, accessTokenSecret } = require('../data');

const authRouter = express.Router();

function signIn(req, res, next) {
    const { username, password } = req.body;
    const user = users.find(user => { return user.username === username && user.password === password});
    console.log(user);

    if(user) {
        const accessToken = jwt.sign({ username: user.username}, accessTokenSecret);
        user.token = accessToken;
        res.json({ accessToken, username });
        res.send('Token generated');
    } else {
        res.status(403).send('Username or password are wrong. Please try again or sign up.')
    }
}

function signUp(req, res, next) {
    const { username, password } = req.body;
    const user = users.find(user => { return user.username === username });
    if (!user) {
        users.push({
            username,
            password
        })
        res.status(201).send('User created successfully.');
    } else {
        res.status(400).send('Username already exists');
    }
}

authRouter
    .post('/signin', signIn)
    .post('/signup', signUp);

module.exports = authRouter;