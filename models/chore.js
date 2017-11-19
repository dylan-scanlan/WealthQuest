
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var choreSchema   = new Schema({
    name: String,
    description: String,
    value: Number,
    state: Number
});
var conn = mongoose.createConnection('mongodb://localhost:27017/chores');
module.exports = conn.model('Chore', choreSchema);