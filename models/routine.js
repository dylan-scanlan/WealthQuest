
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var routineSchema   = new Schema({
    name: String,
    description: String,
    chores: [],
    bonusValue: Number
});
var conn = mongoose.createConnection('mongodb://localhost:27017/routines');
module.exports = conn.model('Routine', routineSchema);