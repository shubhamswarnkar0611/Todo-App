const express = require('express');
const UsersController = require('../controllers/usersC');
const router =express.Router();

router.post('/signup',UsersController.signup)
router.post('/login',UsersController.login)

module.exports = router;