const mongoose =  require('mongoose');

const schoolSchema = mongoose.Schema({
    name: { type: String, required: true },
    addess: { type: String, required: true }
});

module.exports = mongoose.model('School', schoolSchema);