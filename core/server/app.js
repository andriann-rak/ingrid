const express = require("express")
const bodyParser = require("body-parser")
const { cors, moduleInit, logger, notFound } = require("./middlewares")
const app = express()

// setting HTTP logger
app.use(logger)

// applying cors
app.use(cors)

// setting JSON parser for the body payload
app.use(bodyParser.json())

// initialize module's router
moduleInit(app)

// Not found Middleware
app.use(notFound)

// Expose the app Object
module.exports = app