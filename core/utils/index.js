const chalk = require("chalk")
const {join} = require("path")

const debugServer = require("debug")("server")


module.exports = {

    /**
     * This method checks if the given port is a valid number
     * @param port
     * @return {Number}
     */
    safePort(port) {
        const safe = parseInt(port, 10)

        if (isNaN(safe))
            throw new Error("Tokony Number ny port fa tsy : " + typeof port)

        if (safe < 0 && safe >= 65535)
            throw new Error("Tokony entre 0-65535 ny port fa tsy : " + safe)

        return safe
    },

    /**
     *
     * @param server
     * @param message
     */
    serverHandler(server, message) {
        server.on("listening", () => {
            const msg = message || `Heart beats properly... [${chalk.bold.blue(server.address().address)}:${chalk.bold.red(server.address().port)}]`
            debugServer(msg)
        })

        server.on("error", (error) => {
            switch (error.code) {
                case "EACCES":
                    throw new Error("Oops! mila permission kay")

                case "EADDRINUSE":
                    throw new Error("Mitadiava port hafa e! efa lasa io")
                default:
                    throw error;
            }
        })
    }
}

