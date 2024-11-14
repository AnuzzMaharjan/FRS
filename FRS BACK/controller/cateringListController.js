const db = require('../database');

const repeatedCateringList = async (pkgName) => {
    const query = `SELECT * FROM cateringpkglist WHERE pkg_name = ?`;
    await db.query(query, [pkgName])
        .then(([rows]) => {
            if (rows.length > 0) return true;
            return false;
        })
        .catch(err => {
            throw new Error(err);
        })
}

const getSubLists = async (parentId) => {
    const query = 'SELECT * FROM cateringpkg_sublist WHERE pkg_id = ?';
    let subLists = [];
    await db.query(query, [parentId])
        .then(([rows]) => {
            subLists = rows;
        })
        .catch(err => {
            throw new Error(err);
        })
    return subLists;
}

const getAllCateringList = async (req, res) => {
    const query = 'SELECT * FROM cateringpkglist';
    let mainList = []
    await db.query(query)
        .then(([rows]) => {
            mainList = rows;
        })
        .catch(err => {
            console.log(err)
            return res.status(404).json({ success: false, message: 'Error Fetching content' });
        })
    await Promise.all(mainList.map(async (value, _) => {
        const subpkgs = await getSubLists(value.pkg_id);
        value.subpkgs = subpkgs;
    }));
    res.status(200).send(mainList);
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

const deleteCateringList = (req, res) => {
    const pkgId = req.body.id ? req.body.id : '';

    if (!pkgId) return res.status(404).send('Id of the pkg is required!!');

    const query = "DELETE FROM cateringpkglist WHERE pkg_id = ?";
    db.execute(query, [pkgId])
        .then(([result]) => {
            if (result.affectedRows > 0) return res.status(200).send(`Package with pkg_id "${pkgId}" deleted successfully!!`);
            return res.status(500).send(`Couldn't delete pkg with pkg_id ${pkgId}`);
        })
        .catch((err) => {
            return res.status(500).send(err);
        })

}

const deleteCateringSubPkg = async (req, res) => {
    const subPkgId = req.params.id;
    const query = 'DELETE FROM cateringpkg_sublist WHERE sublist_id = ?';
    try {
        const [result] = await db.execute(query, [subPkgId]);
        if (result.affectedRows > 0) return res.status(200).send(`Deleted subpkg with sublist_id ${subPkgId}`);
        return res.status(404).send(`Couldnot find the subpg_id ${subPkgId}`);
    } catch (err) {
        res.status(500).send(err)
    }
}

const createCateringSubPkg = async (req, res) => {
    const parentId = req.params.id;
    const contents = Array.isArray(req.body.contents) ? req.body.contents : '';

    if (contents.length === 0) return res.status(404).send('contents are required!');

    const query = "INSERT INTO cateringpkg_sublist(pkg_id,sublist) VALUES (?,?)";
    try {
        //this works cause async always wraps the returning value from inside the function in a promise object
        const subListInsertion = await Promise.all(contents.map(async (value, _) => {
            try {
                const [result] = await db.execute(query, [parentId, value]);
                if (result.affectedRows > 0) return { text: value, result: 'Success' };
                return { index, result: 'failed' };
            } catch (error) {
                return { index, result: error }
            }

            //error with this is after the db.execute promise is resolved, returns the object which is a plain value but not a promise. if had i returned db.execute along with return object in .then, it would have fulfilled the need of returning promise as db.execute is a promise and returning object value from the .then will have the object value wrapped as a promise object of the db.execute and returned as a promise.
            // db.execute(query, [parentI   d, value])
            //     .then(([result]) => {
            //         if (result.affectedRows > 0) {
            //             return { index:index, result: 'Success creating sub package' };
            //             // console.log( 'Success creating sub package' )
            //         } else {
            //             return { index:index, result: 'Failed creating sub package' };
            //             // console.log('Failed creating sub package')
            //         }
            //         // console.log(result);
            //     })
        }));
        return res.status(200).json({ result: subListInsertion });
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    getAllCateringList,
    createCateringList,
    deleteCateringList,
    createCateringSubPkg,
    deleteCateringSubPkg
}