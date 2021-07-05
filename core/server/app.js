const express = require("express")
const bodyParser = require("body-parser")
const { cors, moduleInit, logger } = require("../utils")
const app = express()

// setting HTTP logger
app.use(logger)

// applying cors
app.use(cors)

// setting JSON parser for the body payload
app.use(bodyParser.json())

// initialize module's router
moduleInit(app)

module.exports = app