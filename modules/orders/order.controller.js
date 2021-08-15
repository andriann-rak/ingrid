const Order = require("./order.model")
const Product = require("../products/product.model")

module.exports = {
    getAllOrders(req, res, next) {
        return Order
            .find()
            .limit(50)
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    getOneOrder(req, res, next) {
        const _id = req.params.id

        return Order
            .find({_id})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))

    },
    createOrder(req, res, next) {

        const userId = req.headers.token
        /**
         * @type {Object[]}
         */
        const items = req.body.items
        items.forEach(async item => {
            const _id = item._id
            const results = await Product.find({_id})
            if (results.length > 0){
                const current = results[0]

                const quantity = parseInt(current.quantity) - parseInt(item.quantity)
                const update = await Product.findByIdAndUpdate(_id, {quantity})
                console.log("updating",_id, "...\r\n", update)
            }
        })

        return res.json({createdBy: userId, items})

        // const Order = new Order(req.body)

        // return Order
        //     .save()
        //     .then(result => res.status(200).json({message: "Created successfully", result}))
        //     .catch(error => res.status(500).json({message: "Errors occurred", error}))
    },
    deleteOrder(req, res) {
        const _id = req.params.id
        return Order
            .findOneAndDelete({_id})
            .then(result => res.status(200).json({message: "deleted successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
    },
    editOrder(req, res) {
        const _id = req.params.id

        return Order
            .findOneAndUpdate({_id}, {...req.body})
            .then(result => res.status(200).json({message: "updated successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
    }
}
