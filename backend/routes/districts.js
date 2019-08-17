const express = require('express');

const District = require('../models/district');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new District({
        name: req.body.name
    });
    post.save().then(createdDistrict => {
        res.status(201).json({
            message: 'success',
            districtId: createdDistrict._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    District.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    console.log('Deleteing...', req.params.id);
    District.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    const district = new District({
        _id: req.body.id,
        name: req.body.name,
    });
    District.updateOne({ _id: req.params.id }, district)
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = router;