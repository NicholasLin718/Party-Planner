const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
    date: {
        type: {
            isoTime: {
                type: String,
                required: true
            },
            dayOfWeek: {
                type: String,
                required: true
            }
        },
        required: true
    },
    availableTimes: {
        type: [Boolean],
        required: true
    }
});

module.exports = daySchema;
