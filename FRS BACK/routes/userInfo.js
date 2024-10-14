const express = require('express');
const router = express.Router();

const {getUsers,createUsers,deleteUser,userLogin} = require('../controller/userController');

router.route('/users').get(getUsers);
router.route('/signup').post(createUsers);
router.route('/login').post(userLogin)
router.route('/user/:id').delete(deleteUser);

module.exports = router;