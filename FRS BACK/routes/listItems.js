const express = require('express');
const router = express.Router();

const { getTotalItems,createItemEntry,deleteItemEntry } = require('../controller/listItemsController');

router.route('/items').get(getTotalItems);
router.route('/item/entry').post(createItemEntry);
router.route('/item/:itemId').delete(deleteItemEntry);

module.exports = router;