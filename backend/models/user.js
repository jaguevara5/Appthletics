const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchemma = mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: Number, required: true }
});

// userSchemma.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchemma);