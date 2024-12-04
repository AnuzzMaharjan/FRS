const express = require('express');
const router = express.Router();

const { getTotalItems, createItemEntry, deleteItemEntry } = require('../controller/listItemsController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/items').get(getTotalItems);
router.route('/item/entry').post(verifyAdmin,createItemEntry);
router.route('/item/:itemId').delete(verifyAdmin, deleteItemEntry);
router.route('/')

module.exports = router;