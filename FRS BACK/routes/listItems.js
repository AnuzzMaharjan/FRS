const express = require('express');
const router = express.Router();

const { getTotalItems, createItemEntry, deleteItemEntry, updateItem } = require('../controller/listItemsController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/items').get(getTotalItems);
router.route('/item/entry').post(verifyAdmin,createItemEntry);
router.route('/item/:itemId').delete(verifyAdmin, deleteItemEntry).put(verifyAdmin,updateItem);

module.exports = router;