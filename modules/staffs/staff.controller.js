const Staff = require("./staff.model")
const bcrypt = require("bcryptjs")

module.exports = {
    getAllStaffs(req, res) {

        return Staff
            .find()
            .limit(50)
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))

    },
    getOneStaff(req, res) {
        const _id = req.params.id

        return Staff
            .find({_id})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    getOneStaffByemail(req, res) {
        const email = req.params.email

        return Staff
            .find({email})
            .then(results => res.status(200).json(results))
            .catch(error => res.status(500).json({message: "Server error", error}))
    },
    createStaff(req, res) {

        const salt = bcrypt.genSaltSync()
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const staff = new Staff(req.body)
        return staff
            .save()
            .then(result => res.status(200).json({message: "Created successfully", result}))
            .catch(error => res.status(500).json({message: "Errors occurred", error}))
    },
    editStaff(req, res) {

        const _id = req.params.id

        return Staff
            .findOneAndUpdate({_id}, {...req.body})
            .then(result => res.status(200).json({message: "updated successfully", result}))
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))

    },
    deleteStaff(req, res) {
        const _id = req.params.id
        return Staff
            .findOneAndDelete({_id})
            .then(result => {
                if (result === null) {
                    res.status(404).json({message: `${_id} not found,already deleted, maybe`})
                } else
                    res.status(200).json({message: "deleted successfully", result})
            })
            .catch((error) => res.status(500).json({message: "Errors occurred", error}))
    }
}
