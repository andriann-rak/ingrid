const dotenv = require("dotenv").config()
const chalk = require("chalk")

const debugInfo = require("debug")("info")
debugInfo("%s Booting...", chalk.bold.blue("INGRID"))

const db = require("./core/db")
const server = require("./core/server/server")