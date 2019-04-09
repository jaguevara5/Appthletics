const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const sportsRoutes = require('./routes/sports');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

mongoose.connect('mongodb+srv://alan_g:alng.1jMongo@sportapp-yk7g0.mongodb.net/hisd', { useNewUrlParser: true })
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/sports', sportsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;