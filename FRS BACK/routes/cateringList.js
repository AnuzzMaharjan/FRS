const express = require('express');
const router = express.Router();

const { getAllCateringList, createCateringList, deleteCateringList,createCateringSubPkg, deleteCateringSubPkg, updateCateringList, getSubpakage, updateSubPackage } = require('../controller/cateringListController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/cateringpkgs').get(getAllCateringList);
router.route('/cateringpkg').post(verifyAdmin, createCateringList).delete(verifyAdmin, deleteCateringList);
router.route('/cateringpkg/:id').put(verifyAdmin, updateCateringList).get(getSubpakage);
router.route('/cateringsubpkg/:subId').post(verifyAdmin, createCateringSubPkg).delete(verifyAdmin, deleteCateringSubPkg).put(verifyAdmin,updateSubPackage)

module.exports = router;