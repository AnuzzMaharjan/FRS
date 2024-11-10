const db = require('../database');

const getAllCateringList = (req, res) => {
    const query = 'SELECT * FROM cateringpkglist';
    db.query(query)
    .then(([rows]) => {
        res.json(rows);
    })
    .catch(err => {
        console.log(err)
        return res.status(404).json({ success: false, message: 'Error Fetching content' });
    })
}

module.exports = {
    getAllCateringList
}