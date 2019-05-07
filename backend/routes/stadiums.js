const express = require('express');

const Stadium = require('../models/stadium');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Stadium({
        name: req.body.name,
        address: req.body.address
    });
    post.save().then(createdStadium => {
        res.status(201).json({
            message: 'success',
            stadiumId: createdStadium._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Stadium.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/delete', (req, res, next) => {
    Stadium.deleteMany({ _id: {$in: req.body.stadiums }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    const stadium = new Stadium({
        _id: req.body.id,
        name: req.body.name,
        address: req.body.address
    });
    Stadium.updateOne({ _id: req.params.id }, stadium)
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = router;