let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let roomSchema = new Schema({
    admin_id: Number,
    title: String
}, {
    collection: 'rooms'
})

module.exports = mongoose.model('roomSchema', roomSchema);