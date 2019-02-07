const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('../models/user');

const router = express.Router();

const privateKEY = fs.readFileSync('./backend/routes/keys/private.key', 'utf8');

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ username: req.body.username }).then(user => {
        if(!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: 'Wrong password'
            });
        }
        const token = jwt.sign(
            { username: fetchedUser.username, userId: fetchedUser.userId }, 
            privateKEY, 
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'success',
            data: token
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Auth failed'
        });
    });
});

module.exports = router;