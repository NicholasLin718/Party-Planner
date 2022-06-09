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
        meetingName:{
            type: String,
            required: true
        },
        meetingDescripton:{
            type: String,
            require: false
        },
        participants: {
            type: [personSchema],
            required: true
        },
        meetingDays: {
            type: [String],
            require: true
        }
    }
);

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;