const router = require("express").Router()
const ctrl = require("./order.controller")

router.get("/", ctrl.getAllOrders)
router.get("/:id", ctrl.getOneOrder)

router.post("/", ctrl.createOrder)
router.delete("/:id", ctrl.deleteOrder)
router.patch("/:id", ctrl.editOrder)

module.exports = router