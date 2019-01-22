const express = require('express');

const Sport = require('../models/sport');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Sport({
        name: req.body.name
    });
    post.save().then(createdSport => {
        res.status(201).json({
            message: 'success',
            sportId: createdSport._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Sport.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/delete', (req, res, next) => {
    Sport.deleteMany({ _id: {$in: req.body.sports }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    const sport = new Sport({
        _id: req.body.id,
        name: req.body.name,
    });
    Sport.updateOne({ _id: req.params.id }, sport)
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = router;