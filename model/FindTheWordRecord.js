const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const findTheWordSchema = new Schema({
    username:
    {
        type: String,
        required: true
    },
    record:
    {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("FindTheWord", findTheWordSchema)