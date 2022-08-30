const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    priority: {
        type: Boolean,
        required: false
    },
    taskOwner: {
        type: String,
        required: false
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
