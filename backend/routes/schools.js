const express = require('express');

const School = require('../models/school');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new School({
        name: req.body.name,
        address: req.body.address
    });
    post.save().then(createdSchool => {
        res.status(201).json({
            message: 'success',
            schoolId: createdSchool._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    School.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    School.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    const school = new School({
        _id: req.body.id,
        name: req.body.name,
        address: req.body.address
    });
    School.updateOne({ _id: req.params.id }, school)
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = router;