let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
    event_id: Number,
    title: String,
    start: Date,
    end: Date,
    admin_id: Number
}, {
    collection: 'events'
})

module.exports = mongoose.model('eventSchema', eventSchema);