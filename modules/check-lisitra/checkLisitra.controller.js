const CheckLisitra = require("./CheckLisitra.model")

module.exports = {
    getAllCheckLisitra(req, res) {

        return CheckLisitra
            .find()
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
        
    },
    getOneCheckLisitra(req, res) {
        const _id = req.params.id

        return CheckLisitra
            .find({_id})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    createCheckLisitra(req, res) {
        const CheckLisitra = new CheckLisitra(req.body)

        return CheckLisitra
            .save()
            .then(result => res.status(200).json({message: "Created successfully", result}))
            .catch(error => res.status(500).json({message: "Errors occurred", error}))
    },
    editCheckLisitra(req, res) {

        const _id = req.params.id

        return CheckLisitra
            .findOneAndUpdate({_id}, {...req.body})
            .then(result => res.status(200).json({message: "updated successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
        
    },
    deleteCheckLisitra(req, res) {
        const _id = req.params.id
        return CheckLisitra
            .findOneAndDelete({_id})
            .then(result => res.status(200).json({message: "deleted successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))        
    }
}