const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sport = require('./models/sport');

const app = express();

mongoose.connect('mongodb+srv://alan_g:alng.1jMongo@sportapp-yk7g0.mongodb.net/hisd?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Database!');
    })
    .catch(() => {
        console.log('Connection to DB failed!');
    });

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
    const post = new Sport({
        name: req.body.name
    });
    post.save();
    res.status(201).json({
        message: 'success'
    });
});

app.get('/sports',(req, res, next) => {
    Sport.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

app.post('/sports/delete', (req, res, next) => {
    Sport.deleteMany({ _id: {$in: req.body.sports }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

module.exports = app;