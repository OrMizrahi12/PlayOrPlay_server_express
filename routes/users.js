const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUsers)

router.route('/:_id')
    .delete(usersController.deleteUser)
    .get(usersController.getUser)
    

module.exports = router;