const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { daySchema } = require('./daySchema');

const personSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    availableTimes: {
        type: [daySchema],
        required: true
    },
    securityQuestion: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    sprite: {
        type: Number,
        required: true
    }
});

module.exports = personSchema;
