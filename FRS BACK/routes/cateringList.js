const express = require('express');
const router = express.Router();

const { getAllCateringList, createCateringList, deleteCateringList,createCateringSubPkg, deleteCateringSubPkg, updateCateringList } = require('../controller/cateringListController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/cateringpkgs').get(getAllCateringList);
router.route('/cateringpkg').post(verifyAdmin, createCateringList).delete(verifyAdmin, deleteCateringList);
router.route('/cateringpkg/:id').put(verifyAdmin, updateCateringList).post(verifyAdmin, createCateringSubPkg).delete(verifyAdmin,deleteCateringSubPkg);

module.exports = router;