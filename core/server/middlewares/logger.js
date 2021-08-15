const mongoose = require("mongoose")
const chalk = require("chalk")
const {Request, Response, NextFunction} = require("express")

const debugHttp = require("debug")("http")
const debugInfo = require("debug")("info")

const logSchema = mongoose.Schema({
    ip: {type: String, required: true},
    path: {type: String, required: true},
    params: {type: Object, required: false},
    timestamp: {type: Date, default: Date.now},
    count: {type: Number, default: 0}
})

const LogModel = mongoose.model("log", logSchema)

async function checkLogs(payload) {
    const query = LogModel.findOne({ip: payload.ip, timestamp: {$lte: payload.timestamp}, path: payload.path})
    return await query.exec()
}

/**
 * Logging system
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function logger(req, res, next) {

    next()

    const payload = {
        ip: req.connection.remoteAddress,
        path: req.path,
        params: req.params,
        timestamp: new Date()
    }

    Object.keys(payload.params).forEach(key => {
        const reg = new RegExp(`/${payload.params[key]}`, "igm")
        payload.path = payload.path.replace(reg, "")
    })

    debugHttp(req.method, chalk.bold.greenBright(payload.path), chalk.bold.blueBright(res.statusCode))

    const docLog = await checkLogs(payload)

    if (!docLog) {
        const newLog = new LogModel(payload)
        newLog
            .save()
            .then(result => {
                debugInfo("log saved successfully...", result._id)
            })
            .catch(err => {
                debugInfo("saving log error", err)
            })

    } else {
        LogModel.findOneAndUpdate({_id: docLog._id}, {count: docLog.count + 1})
            .then(result => {
                debugInfo("log updated successfully", result._id)
            })
    }
}

module.exports = logger