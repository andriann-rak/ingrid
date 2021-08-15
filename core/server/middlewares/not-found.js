function notFound(req, res) {
    res.status(404).json({message: "Not found", code: 404})
}

module.exports = notFound
