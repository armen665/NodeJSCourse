const express = require('express')
const jwt = require('jsonwebtoken');

const authRouter = require('./auth');
const usersRouter = require('./users');

const router = express.Router();

const { accessTokenSecret } = require('../data');


// public
router.use( authRouter);

function checkPublicOrPrivate(req, res, next) {
    if (req.path === '/signin' || req.path === '/signup') {
        return next()
    }

    authorization(req, res, next);
}


function authorization(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

router.use(checkPublicOrPrivate, usersRouter);

// router.use(function (req, res, next) {
//     // res.status(404).send("Sorry can't find that!")
// })
//
// // eslint-disable-next-line
// router.use(function (err, req, res, next) {
//
// })

module.exports = router;