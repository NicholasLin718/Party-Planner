const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        availableTimes: {
            type: [(String, String)],
            required: true
        }
    }

);

const pageSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        // SET TO FALSE FOR NOW TO TEST CRUD
        meetupName: {
            type: String,
            required: false
        },
        meetupDescripton: {
            type: String,
            required: false
        },
        participants: {
            type: [personSchema],
            required: false
        },
        meetupDays: {
            type: [String],
            required: false
        },
        meetupTimeRange: {
            type: String,
            required: false
        }
    }
);

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;