const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * @param {String} mongodb_url A string of MongoDB URL.
 */
async function connect(mongodb_url) {
    mongoose.connect(mongodb_url, {
        useNewUrlParser: true
    });

    let db = mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => {
        console.log('Mongoose connection is open to ' + mongodb_url);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => console.log('Mongoose connection is disconnected due to application termination!'));
        process.exit(0);
    })
}

module.exports = {
    connect
};