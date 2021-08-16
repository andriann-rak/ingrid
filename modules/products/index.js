const router = require("express").Router()
const ctrl = require("./product.controller")

router.get("/", ctrl.getAllProducts)
router.get("/where/:doc", ctrl.getProductsWithFilter)
router.get("/:id", ctrl.getOneProduct)

router.post("/", ctrl.createProduct)
router.delete("/:id", ctrl.deleteProduct)
router.patch("/:id", ctrl.editProduct)

module.exports = router
