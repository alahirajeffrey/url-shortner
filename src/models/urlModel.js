const mongoose = require('mongoose')
const shortid = require('shortid');

const UrlSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Url', UrlSchema);