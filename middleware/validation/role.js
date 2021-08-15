const { Request, Response, NextFunction } = require("express")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const util = require("util")
const verify = util.promisify(jwt.verify)

function keyGen(key) {
    const buff = crypto.scryptSync(key, "aes-192-cbc", 30)
    return Buffer.from(buff).toString("hex")
}

module.exports = {

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    isAdmin: async (req, res, next) => {
        if (req.headers.hasOwnProperty("token")) {
            try{
                const {token} = req.headers
                const key = keyGen("hello")
                const isMatch = await verify(token, key)
                return next()
            }catch (error) {
                if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({error})
                }else
                    return res.status(500).json({error})
            }
        }
    }
}