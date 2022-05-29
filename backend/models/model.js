const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema(
    {
        code: {
            type: String,
            required: true
        }
    }
);

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;