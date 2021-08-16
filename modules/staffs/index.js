const router = require("express").Router()
const ctrl = require("./staff.controller")
const {validation} = require("../../middleware/validation")
const {isAdmin} = require("../../middleware/validation/role")

router.get("/", ctrl.getAllStaffs)
router.get("/:id", ctrl.getOneStaff)
router.get("/:email", ctrl.getOneStaffByemail)

router.post("/", validation, ctrl.createStaff)
router.patch("/:id", isAdmin, ctrl.editStaff)
router.delete("/:id", isAdmin, ctrl.deleteStaff)

module.exports = router
