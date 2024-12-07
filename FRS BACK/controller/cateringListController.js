const db = require('../database');

const repeatedCateringList = async (pkgName) => {
    const query = `SELECT * FROM cateringpkglist WHERE pkg_name = ?`;
    return await db.query(query, [pkgName])
        .then(([rows]) => {
            return rows.length !== 0;
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

const createCateringList = async (req, res) => {
    const pkgName = req.body.pkg_name ? req.body.pkg_name : '';
    if (!pkgName) return res.status(404).send('Package name as pkg_name required!');
    if (await repeatedCateringList(pkgName.trim())) return res.status(409).send(`Package with pkg_name " ${pkgName} " already exists!`);

    const query = `INSERT INTO cateringpkglist(pkg_name) VALUES (?)`;
    await db.execute(query, [pkgName])
        .then(([result]) => {
            if (result.affectedRows > 0) return res.status(200).send('Catering package created successfully!!');

            return res.status(500).send('Couldn\'t create a catering package!!');
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

const updateCateringList = async(req, res) => {
    const {id} = req.params;
    const { pkgName } = req.body; 

    if (await repeatedCateringList(pkgName.trim())) {
        return res.status(409).send(`Pkg with name ${pkgName} already exists!`);
    }

    if (id && pkgName) {
        const query = `UPDATE cateringpkglist SET pkg_name = ? where pkg_id = ${id}`;

        try {
            await db.execute(query, [pkgName]).then(([result]) => {
               return result.affectedRows > 0 ? res.status(200).send('Updated successfully!') : res.status(500).send('Failed to update!');
            })
        } catch (error) {
            console.log('Failed to operate: ', error);
            return res.status(500).send('Db query execution failed!');
        }
    } else {
        return res.status(400).send('Missing required data!');
    }
}

const deleteCateringSubPkg = async (req, res) => {
    const subPkgId = req.params.id;
    const query = 'DELETE FROM cateringpkg_sublist WHERE sublist_id = ?';
    try {
        const [result] = await db.execute(query, [subPkgId]);
        if (result.affectedRows > 0) return res.status(200).send(`Deleted subpkg with sublist_id ${subPkgId}`);
        return res.status(404).send(`Couldnot find the subpkg_id ${subPkgId}`);
    } catch (err) {
        res.status(500).send(err)
    }
}

const createCateringSubPkg = async (req, res) => {
    const parentId = req.params.subId;
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

const getSubpakage = async (req, res) => {
    let { id } = req.params;
    
    if (id) {
        try {
            const query = `SELECT * FROM cateringpkg_sublist WHERE pkg_id = ${id}`;
            await db.query(query)
                .then(([rows]) => {
                    return res.status(200).send([rows]);
                }).catch(err => {
                    return res.status(500).send('Failed to fetch: ' + err);
            })
        } catch (err) {
            return res.status(500).send('DB failure: ' + err);
        }
    }
}

const updateSubPackage = async (req, res) => {
    const { subId } = req.params;
    const { pkg_id, sublist } = req.body;
    
    try {
        const query = `UPDATE cateringpkg_sublist SET pkg_id = ?, sublist = ? WHERE sublist_id = ${subId}`;

        await db.execute(query, [pkg_id, sublist])
            .then(([result]) => {
                if (result.affectedRows > 0) return res.status(200).send("Updated successsfully!");
                else return res.status(500).send("Update failed!");
            })
            .catch(err => {
                return res.status(500).send("Couldn't update: " + err);
        })
        
    } catch (error) {
        return res.status(500).send('Db failure: ' + error);
    }
}

module.exports = {
    getAllCateringList,
    createCateringList,
    deleteCateringList,
    createCateringSubPkg,
    deleteCateringSubPkg,
    updateCateringList,
    getSubpakage,
    updateSubPackage
}