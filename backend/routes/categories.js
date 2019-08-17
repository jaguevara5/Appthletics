const express = require('express');

const Category = require('../models/category');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Category({
        name: req.body.name
    });
    post.save().then(createdCategory => {
        res.status(201).json({
            message: 'success',
            categoryId: createdCategory._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Category.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Category.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    const category = new Category({
        _id: req.body.id,
        name: req.body.name,
    });
    Category.updateOne({ _id: req.params.id }, category)
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = router;