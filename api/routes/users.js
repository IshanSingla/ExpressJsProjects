const express = require('express');
const router = express.Router();
const UserController = require('../modules/Auth.js');
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/verify/:id', UserController.verify);
module.exports = router;