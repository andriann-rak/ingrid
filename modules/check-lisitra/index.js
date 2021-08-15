const router = require("express").Router()
const ctrl = require("./checkLisitra.controller")

router.get("/", ctrl.getAllCheckLisitra)
router.get("/:id", ctrl.getOneCheckLisitra)

router.post("/", ctrl.createCheckLisitra)
router.patch("/:id", ctrl.editCheckLisitra)
router.delete("/:id", ctrl.deleteCheckLisitra)

module.exports = router