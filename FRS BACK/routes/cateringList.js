const express = require('express');
const router = express.Router();

const { getAllCateringList } = require('../controller/cateringListController');

router.route('/cateringpkgs').get(getAllCateringList);

module.exports = router;