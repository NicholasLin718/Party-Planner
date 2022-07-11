const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    availableTimes: {
        type: [(String, String)],
        required: true
    }
});

const pageSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    meetupName: {
        type: String,
        required: true // true
    },
    meetupDescription: {
        type: String,
        required: false
    },
    meetupLocation: {
        type: {
            name: {
                type: String,
                required: false
            },
            address: {
                type: String,
                required: false
            }
        },
        required: false
    },
    users: {
        type: [
            {
                username: { type: String, required: true },
                password: { type: String, required: false }
            }
        ],
        required: false
    },
    participants: {
        type: [personSchema],
        required: false
    },
    meetupDays: {
        type: String,
        required: true // true
    },
    meetupTimeRange: {
        type: String,
        required: true // true
    }
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
