const express = require('express');
const router = express.Router();

const { getAllCateringList, createCateringList } = require('../controller/cateringListController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/cateringpkgs').get(getAllCateringList);
router.route('/cateringpkgentry').post(verifyAdmin,createCateringList);

module.exports = router;