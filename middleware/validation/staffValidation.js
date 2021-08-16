const {Joi, validate} = require("express-validation")

module.exports = {

    isValidStaff: (req, res, next) => {
        const {firstname, lastname, email, password, confPassword,role} = req.body
        const regex = {
            regName: /^[a-z\s]{3,20}/i,
            regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            regPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/,
            regRole: /admin|commercial|staff/
        }

        const fieldErrors = {}

        if (!regex.regName.test(firstname) || typeof firstname === "undefined") {
            fieldErrors["firstname"] = "firstname invalid"
        }
        if (!regex.regName.test(lastname) || typeof lastname === "undefined") {
            fieldErrors["lastname"] = "lastname invalid"
        }
        if (!regex.regEmail.test(email)) {
            fieldErrors["email"] = "email invalid"
        }
        if (!regex.regPassword.test(password)) {
            fieldErrors["password"] = "Bad password"
        }
        if (!regex.regRole.test(role)) {
            fieldErrors["role"] = "Role doesn't exit"
        }
        if (password !== confPassword) {
            fieldErrors["confPassword"] = "password are not equals"
        }

        if (Object.keys(fieldErrors).length !== 0) return res.status(400).json({fieldsErrors: fieldErrors})
        else return next()
    }
}