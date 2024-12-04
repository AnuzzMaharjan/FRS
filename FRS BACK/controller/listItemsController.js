const db = require('../database');

const checkItemRepetitionId = async (id) => {
    const query = 'SELECT * FROM itemsList WHERE itemId = ?';
    try {
        const [result] = await db.query(query, [Number(id)]);
        return result.length > 0 ? true : false;
    } catch (err) {
        return console.log('Failed to verify id: ', err);
    }
}
const checkItemRepetitionName = async (name) => {
    const query = 'SELECT * FROM itemsList WHERE itemName = ?';
    try {
        const [result] = await db.query(query, [name]);
        return result.length > 0 ? true : false;
    } catch (err) {
        return console.log('Failed to verify itemName: ', err);
    }
}

const getTotalItems = (req, res) => {
    const query = 'SELECT * FROM itemsList';
    db.query(query)
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(err => {
            console.log('Error fetching: ', err);
            return res.status(404).send('Error fetching data');
    })
}

const getSingleItem = (req, res) => {
    const itemId = Number(req.params.id);
    const query = 'SELECT * FROM itemsList WHERE id = ?';

    db.query(query, [itemId])
        .then(([row]) => {
            if (row.length > 0) {
                res.status(200).json(row);
            } else {
                res.status(500).json('Something went wrong!');
            }
        })
        .catch(err => {
            console.log('Couldn\t fetch the item!',err);
            res.status(500).send('Fetch error!');
    })
}

const createItemEntry = async (req, res) => { 
    const { itemName, itemPrice, stock } = req.body;

    if (await checkItemRepetitionName(itemName)) {
        return res.status(409).send('Item already exists!');
    }

    const query = "INSERT INTO itemsList(itemName,itemPrice,stock) values(?,?,?)";
    db.execute(query, [itemName, itemPrice, stock])
        .then(([result]) => {
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: `${itemName} entry created!` });
            } else {
                return res.status(422).json({ message: 'Failed to create the item entry' });
            }
        })
        .catch(err => {
            console.error('Execution failed: ', err);
            return res.status(500).send('Execution failed!');
    })
}

const deleteItemEntry = async (req, res) => {
    const itemId = Number(req.params.itemId);
    const itemPresent = await checkItemRepetitionId(itemId);

    if (itemPresent) {
        const query = "DELETE FROM itemsList WHERE itemId = ?";
        db.execute(query, [itemId])
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: `Item with itemId: ${itemId} deleted successfully` });
                }
            })
            .catch(err => {
                console.error('Failed to execute: ', err);
                return res.status(500).send('Something went wrong!');
        })
    } else {
        return res.status(404).json({ message: `Item with id: ${itemId} is not found!` });
    }
}

const updateItem = async(req,res) => {
    const updateParams = req.body;
    console.log(updateParams); 
}

module.exports = {
    getTotalItems,
    createItemEntry,
    deleteItemEntry,
    getSingleItem,
    updateItem
}