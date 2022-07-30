const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    availableTimes: {
        type: [Boolean],
        required: true
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
