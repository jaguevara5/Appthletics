const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/sports', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/sports',(req, res, next) => {
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