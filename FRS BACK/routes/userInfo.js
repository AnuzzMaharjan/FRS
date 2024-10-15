const express = require('express');
const router = express.Router();

const { getUsers, createUsers, deleteUser, userLogin, getUser } = require('../controller/userController');
const authentication = require('../middleware/authentication');

router.route('/users').get(getUsers);
router.route('/signup').post(createUsers);
router.route('/login').post(userLogin)
router.route('/user/:id').delete(deleteUser).get(authentication,getUser);

module.exports = router;