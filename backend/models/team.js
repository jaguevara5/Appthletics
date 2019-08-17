const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    name: { type: String, required: true },
    district: { type: Schema.Types.ObjectID, ref: 'District' },
    sport: { type: Schema.Types.ObjectID, ref: 'Sport' },
    school: { type: Schema.Types.ObjectID, ref: 'School' }
});

module.exports = mongoose.model('Team', teamSchema);