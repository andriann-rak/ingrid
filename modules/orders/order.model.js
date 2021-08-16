const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    createdAt: {type: Date, default: Date.now()},
    createdBy: {type: String, required: true},
    items:{type: Array, default: []},
    status: {type: String, default: "pending"},
    amount: {type: Number, default: 0}
})

module.exports = mongoose.model("Order", Schema)