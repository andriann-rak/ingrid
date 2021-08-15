const {isAdmin} = require("./role")
const {isValidStaff} = require("./staffValidation")

module.exports = {
    validation: [
        isAdmin,
        isValidStaff,
    ]
}