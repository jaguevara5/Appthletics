const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postRoutes = require('./routes/sports');

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
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/sports', postRoutes);

module.exports = app;