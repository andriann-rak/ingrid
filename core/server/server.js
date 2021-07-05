const debug = require("debug")("server")
debug("initializing server")

const { createServer } = require("http")
const app = require("./app")
const { safePort, serverHandler} = require("../utils")

const server = createServer(app)
const port = process.env.PORT || 4000
const host = process.env.HOsT || "127.0.0.1"


serverHandler(server)
debug("listening...")
server.listen({
    host: host,
    port: safePort(port)
})

module.exports = server