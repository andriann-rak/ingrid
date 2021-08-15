const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isConnected: {type: Boolean, default: false},
    lastConnection: {type: Date},
    memberSince: {type: Date, default: Date.now},
    role: {type: String, default: "commercial"}, // commercial | staff | admin
    monthStat: {
        made: {type: Number, default: 0}, // Total
        canceled: {type: Number, default: 0},
        delivered: {type: Array, default: []},
        amount: {type: Number, default: 0}
    }
})

module.exports = mongoose.model("Staff", Schema)