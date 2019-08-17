const express = require('express');

const Team = require('../models/team');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    console.log('posting...');
    console.log(req.body);
    const post = new Team({
        name: req.body.name,
        district: req.body.district,
        sport: req.body.sport,
        school: req.body.school
    });
    post.save().then(createdTeam => {
        res.status(201).json({
            message: 'success',
            teamId: createdTeam._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Team.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

// router.post('/delete', (req, res, next) => {
//     Team.deleteMany({ _id: {$in: req.body.teams }})
//     .then(() => {
//         res.status(200).json({
//             message: 'success'
//         });
//     });
// });

// router.put('/:id', (req, res, next) => {
//     const team = new Team({
//         _id: req.body.id,
//         name: req.body.name,
//         address: req.body.address
//     });
//     Team.updateOne({ _id: req.params.id }, team)
//     .then(() => {
//         res.status(200).json({
//             message: 'success'
//         });
//     });
// });

module.exports = router;