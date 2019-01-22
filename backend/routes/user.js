const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/new', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            userid: req.body.userid,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'success',
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});

module.exports = router;