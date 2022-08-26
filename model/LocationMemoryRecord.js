const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationMemorySchema = new Schema({
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

module.exports = mongoose.model("LocationMemory", locationMemorySchema)