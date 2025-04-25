exports.create = async (req, res) => {
    try {
        res.send('Catagory')
    } catch(err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        res.send('list Category')
    } catch(err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        res.send('delete Category')
    } catch(err) {
        res.status(500).json({ msg: "Server Error" })
    }
}