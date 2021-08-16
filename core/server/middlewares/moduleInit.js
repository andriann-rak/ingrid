const chalk = require("chalk")
const {join} = require("path")
const {readdirSync} = require("fs")
const modulesPath = join(process.cwd(), "modules")

const debugModules = require("debug")("modules")

/**
 * this method scans the folder "modules" then use all sub-folders name as route
 * @param app
 */
function moduleInit(app) {
    try {
        const modulesContents = readdirSync(modulesPath, {withFileTypes: true})
        const dirs = modulesContents.filter(dir => dir.isDirectory())
        debugModules("modules init...", chalk.bold.green(dirs.length))
        dirs.forEach(dir => app.use(`/${dir.name}`, require(join(process.cwd(), "modules", dir.name))))
        debugModules("modules initialized")
    }catch (e) {
        debugModules(chalk.bold.red(e.message))
    }
}

module.exports = moduleInit