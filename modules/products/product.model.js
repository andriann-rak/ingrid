const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    ref: {type: String, required: true},
    name: {type: String, required: true},
    quantity: {type: Number, default: 0},
    category: {type: String, required: true},
    price: {
        0: {type: Number, required: true},
        1: {type: Number, required: false}
    }
})

module.exports = mongoose.model("Product", Schema)
