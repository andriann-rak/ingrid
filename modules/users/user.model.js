const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    isSpecial: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", Schema)