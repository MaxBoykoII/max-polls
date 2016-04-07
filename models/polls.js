var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var poll = new Schema({
    "creator": String,
    "title": String,
    "data": [Number],
    "labels": [String],
    "user_votes": [String],
    "ip_votes": [String]
});

module.exports = mongoose.model('polls', poll, 'polls');