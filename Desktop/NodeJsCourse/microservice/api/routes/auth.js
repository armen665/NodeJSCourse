const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { users, accessTokenSecret } = require('../data');

const {User} = require('../../db/index');

const authRouter = express.Router();

function signIn(req, res, next) {
    const { username, password } = req.body;
    // const user = users.find(user => { return user.username === username && user.password === password});
    // console.log(user);

    User.find({username:username}, (err, data) => {
        if(err) {
            return res.status(500).send('Something went wrong')
        }
        if(data.length > 0) {
            const accessToken = jwt.sign({ username }, accessTokenSecret);
            res.json({ accessToken, username });
            res.send('Token generated');
            console.log("user created successfully");
        } else {
            res.status(403).send('Username or password are wrong. Please try again or sign up.')
        }

    })

    // if(user) {
    //     const accessToken = jwt.sign({ username: user.username}, accessTokenSecret);
    //     user.token = accessToken;
    //     res.json({ accessToken, username });
    //     res.send('Token generated');
    // } else {
    //     res.status(403).send('Username or password are wrong. Please try again or sign up.')
    // }
}

function signUp(req, res, next) {
    const { username, password } = req.body;
    User.find({username:username, password:password}, (err, data) => {
        console.log(err);
        if(err) {
            return res.status(500).send('Something went wrong')
        }
        if(data.length > 0) {
            res.status(200).send('Signed in successfully.');
        } else {
            res.status(403).send('Username or password are incorrect')
        }
    })

}

authRouter
    .post('/signin', signIn)
    .post('/signup', signUp);

module.exports = authRouter;