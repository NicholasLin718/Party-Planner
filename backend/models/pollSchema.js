const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    voted: {
        type: [String],
        required: true
    },
    options: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            numVotes: {
                type: Number,
                required: true,
            }
        }],
        required: true
    }

})

module.exports = pollSchema;
