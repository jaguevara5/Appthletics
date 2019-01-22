const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchemma = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userid: { type: Number, required: true, unique: true }
});

userSchemma.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchemma);