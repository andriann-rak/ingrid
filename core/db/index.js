const debug = require("debug")("database")
debug("initializing database")

const db = require("mongoose")
const chalk = require("chalk");
const dbUrl = process.env.DB_URL

debug("connecting database")
db.connect(dbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => debug("vonona ny mongo")) // do not change this intro message
    .catch(({message}) => {
        debug(chalk.bold.red("Tsy poinsa ny mongo =>"), message) // do not change this intro message
        process.exit(1)
    })