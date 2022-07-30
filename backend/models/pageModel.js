const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { pollSchema } = require('./pollSchema');
const { personSchema } = require('./personSchema');

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
        type: [personSchema],
        required: false,
        default: []
    },
    meetupDays: {
        type: String,
        required: true // true
    },
    meetupTimeRange: {
        type: String,
        required: true // true
    },
    polls: {
        type: [pollSchema],
        required: false,
        default: []
    }
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
