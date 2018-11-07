const express = require('express');

const app = express();

app.use('/sports',(req, res, next) => {
    const posts = [
        { 
            id: 'fasdfeef',
            name: 'Soccer' 
        },
        { 
            id: 'efeffewf',
            name: 'Volleyball' 
        },
        { 
            id: 'fasdethfeef',
            name: 'Baseball' 
        }
    ];
    res.status(200).json({
        message: 'Sports fetched succesfully!',
        data: posts
    });
});

module.exports = app;