const express = require('express');
const router = express.Router();

const { getUsers, createUsers, deleteUser, userLogin, getUser,test } = require('../controller/userController');
const { generateOTP, verifyOTP } = require('../middleware/otp');
const authentication = require('../middleware/authentication');

router.route('/users').get(getUsers);
router.route('/generateotp').post(generateOTP);
router.route('/signup').post(verifyOTP,createUsers);
router.route('/login').post(userLogin);
router.route('/user/:id').delete(deleteUser).get(authentication,getUser);

module.exports = router;