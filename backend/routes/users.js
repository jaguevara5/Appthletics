const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('', checkAuth, (req, res, next) => {
    User.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/new', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            userId: req.body.userId,
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

router.post('/delete', (req, res, next) => {
    User.deleteMany({ _id: {$in: req.body.users }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    if(req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                _id: req.body.id,
                username: req.body.username,
                name: req.body.name,
                lastname: req.body.lastname,
                password: hash,
                userId: req.body.userId,
            });
            User.updateOne({ _id: req.params.id }, user)
            .then(() => {
                res.status(200).json({
                    message: 'success'
                });
            });
        });
    } else {
        const user = new User({
            _id: req.body.id,
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            userId: req.body.userId,
        });
        User.updateOne({ _id: req.params.id }, user)
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        });
    }
});

module.exports = router;