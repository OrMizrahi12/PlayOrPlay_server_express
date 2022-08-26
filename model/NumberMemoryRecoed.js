const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const numberMemorySchema = new Schema({
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

module.exports = mongoose.model("NumberMemory", numberMemorySchema)