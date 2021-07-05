const chalk = require("chalk")
const {join} = require("path")
const {readdirSync} = require("fs")
const modulesPath = join(process.cwd(), "modules")

const debugServer = require("debug")("server")
const debugModules = require("debug")("modules")
const debugHttp = require("debug")("http")


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
    },

    /**
     * CORS (Cross Origin Resources Sharing)
     */
    cors(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
        return next()
    },

    /**
     * this method scans the folder "modules" then use all sub-folders name as route
     * @param app
     */
    moduleInit(app) {
        try {
            const modulesContents = readdirSync(modulesPath, {withFileTypes: true})
            const dirs = modulesContents.filter(dir => dir.isDirectory())
            debugModules("modules init...", chalk.bold.green(dirs.length))
            dirs.forEach(dir => app.use(`/${dir.name}`, require(join(process.cwd(), "modules", dir.name))))
            debugModules("modules initialized")
        }catch (e) {
                debugModules(chalk.bold.red(e.message))
            }
        },

        /**
         * Logging system
         * @param req
         * @param res
         * @param next
         */
        logger(req, res, next) {
            debugHttp(req.method, chalk.greenBright(req.url), chalk.blueBright(req.statusCode))
            next()
        }
    }

