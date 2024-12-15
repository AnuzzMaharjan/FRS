const express = require('express');
const router = express.Router();

const { getUsers, createUsers, deleteUser, userLogin, getUser,test, updateUser } = require('../controller/userController');
const { generateOTP, verifyOTP } = require('../middleware/otp');
const authentication = require('../middleware/authentication');
const verifyAdmin = require('../middleware/verifyAdmin');

router.route('/users').get(verifyAdmin,getUsers);
router.route('/generateotp').post(generateOTP);
router.route('/signup').post(createUsers);
router.route('/login').post(verifyOTP,userLogin);
router.route('/user/:id').delete(verifyAdmin,deleteUser).get(authentication,getUser).patch(verifyAdmin,updateUser);

module.exports = router;