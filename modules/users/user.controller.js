const User = require("./user.model")

module.exports = {
    getAllUsers(req, res) {

        return User
            .find()
            .limit(50)
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
        
    },
    getOneUser(req, res) {
        const _id = req.params.id

        return User
            .find({_id})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    createUser(req, res) {
        const user = new User(req.body)

        return user
            .save()
            .then(result => res.status(200).json({message: "Created successfully", result}))
            .catch(error => res.status(500).json({message: "Errors occurred", error}))
    },
    editUser(req, res) {

        const _id = req.params.id

        return User
            .findOneAndUpdate({_id}, {...req.body})
            .then(result => res.status(200).json({message: "updated successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
        
    },
    deleteUser(req, res) {
        const _id = req.params.id
        return User
            .findOneAndDelete({_id})
            .then(result => res.status(200).json({message: "deleted successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))        
    }
}