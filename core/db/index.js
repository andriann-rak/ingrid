const debug = require("debug")("database")
debug("initializing database")

const db = require("mongoose")
const dbUrl = process.env.DB_URL

debug("connecting database")
db.connect(dbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => debug("vonona ny mongo"))
    .catch(({message}) => {
        debug(chalk.bold.red("Tsy poinsa ny mongo =>"), message)
        process.exit(1)
    })