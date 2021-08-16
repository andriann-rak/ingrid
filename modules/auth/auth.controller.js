const util = require("util")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const body = require("body-parser")
const Staff = require("../staffs/staff.model")

const compare = util.promisify(bcrypt.compare)
const sign = util.promisify(jwt.sign)

function keyGen(key) {
    const buff = crypto.scryptSync(key, "aes-192-cbc", 30)
    return Buffer.from(buff).toString("hex")
}

module.exports = {
    async checkEmail(req, res){
        try {
            const {email} = req.params
            const result = await Staff.findOne({email})

            if (result) {
                res.status(302).json({status: "OK"})
            }else
                res.status(404).json({status: "NOT FOUND"})

        }catch (error){
            res.status(500).json({status: "NOT FOUND"})
        }
    },

    async login(req, res) {
        try {

            const {email, password} = req.body
            const staff = await Staff.findOne({email})

            if (staff){
                const isMatch = await compare(password, staff.password)
                if (isMatch) {
                    await Staff.findOneAndUpdate({_id: staff._id}, {
                        isConnected: true,
                        lastConnection: Date.now()
                    }, {useFindAndModify: false})

                    const token = await sign(JSON.stringify(staff), keyGen("hello"))

                    return res.json({token})
                }else
                    return res.status(400).json({message: "password doesn't match"})
            }else
                return res.status(404).json({message: "email not found"})


        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                console.log("JsonWebTokenError", error)
                return res.status(401).json({error})
            } else
                console.log(error)
                return res.status(500).json({error})
        }

/*
 *
 * Old Code that work properly (or not)

        Staff.findOne({email})
            .then((result) => {
                bcrypt.compare(password, result.password, (err, isTrue) => {
                    if(err) return res.status(500).json({message: "Internal server error"})
                    if(isTrue){
                        jwt.sign(JSON.stringify(result), key, (err, token) => {
                            if(err) return res.status(500).json({message: "Internal server error"})
                            return res.json({token})
                        })
                    }else return res.status(400).json({message: "Bad request"})
                })
            })
            .catch((err) => {
                return res.status(404).json({message: "Not found", err})
            })
            bcrypt.genSalt()
            .then(salt => {
                bcrypt.hash("test", salt, (err, hash) => {
                    console.log(hash)//$2a$10$5CCP8n85blFIes2bkVj0peZp9U8i9kO9iOIG3UA.s6KQBsS7cs1BG
                })
            })
            .catch(err => console.log)
*/

    }

}
