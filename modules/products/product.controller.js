const Product = require("./product.model")

module.exports = {
    getAllProducts(req, res, next) {
        return Product
            .find()
            .limit(50)
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    getOneProduct(req, res, next) {
        const _id = req.params.id

        return Product
            .find({_id})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))

    },
    getProductsWithFilter(req, res, next) {
        const filter = {}
        const doc = req.params.doc
        filter[doc] = req.query

        return Product
            .find(filter)
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    createProduct(req, res, next) {
        const product = new Product(req.body)

        return product
            .save()
            .then(result => res.status(200).json({message: "Created successfully", result}))
            .catch(error => res.status(500).json({message: "Errors occurred", error}))
    },
    deleteProduct(req, res, next) {
        const _id = req.params.id
        return Product
            .findOneAndDelete({_id})
            .then(result => res.status(200).json({message: "deleted successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
    },
    editProduct(req, res, next) {
        const _id = req.params.id

        return Product
            .findOneAndUpdate({_id}, {...req.body})
            .then(result => res.status(200).json({message: "updated successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
    }

}