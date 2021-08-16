const router = require("express").Router()
const ctrl = require("./user.controller")

router.get("/", ctrl.getAllUsers)
router.get("/:id", ctrl.getOneUser)

router.post("/", ctrl.createUser)
router.patch("/", ctrl.editUser)
router.delete("/", ctrl.deleteUser)

module.exports = router