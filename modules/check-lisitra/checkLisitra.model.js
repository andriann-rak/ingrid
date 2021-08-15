const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    content: {type: String, required: true},
    isDone: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    toBeDoneBefore: {type: Date}
})

module.exports = mongoose.model("CheckLisitra", Schema, "checkLisitra")