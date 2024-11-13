const db = require('../database');

const repeatedCateringList = async(pkgName) => {
    const query = `SELECT * FROM cateringpkglist WHERE pkg_name = ?`;
    await db.query(query,[pkgName])
        .then(([rows]) => {
            if (rows.length > 0) return true;
            return false;
        })
        .catch(err => {
            throw new Error(err);
        })
}

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

const createCateringList = (req, res) => {
    const pkgName = req.body.pkg_name ? req.body.pkg_name : '';
    if (!pkgName) return res.status(404).send('Package name as pkg_name required!');

    if (repeatedCateringList(pkgName)) return res.status(409).send(`Package with pkg_name " ${pkgName} " already exists!`);

    const query = `INSERT INTO cateringpkglist(pkg_name) VALUES (?)`;
    db.execute(query, [pkgName])
        .then(([result]) => {
            if (result.affectedRows > 0) return res.status(200).send('Catering package created successfully!!');

            return res.status(500).send('Couldn\' create a catering package!!');
        })
        .catch(err => {
            return res.status(500).send(err);
        })
}

module.exports = {
    getAllCateringList,
    createCateringList
}