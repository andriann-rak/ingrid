const router = require("express").Router()
const ctrl = require("./checkLisitra.controller")

router.get("/", ctrl.getAllCheckLisitra)
router.get("/:id", ctrl.getOneCheckLisitra)

router.post("/", ctrl.createCheckLisitra)
router.patch("/", ctrl.editCheckLisitra)
router.delete("/", ctrl.deleteCheckLisitra)

module.exports = router