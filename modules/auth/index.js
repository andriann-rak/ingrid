const router = require("express").Router()
const ctrl = require("./auth.controller")

router.post("/", ctrl.login)
router.get("/check-email/:email", ctrl.checkEmail)

module.exports = router
