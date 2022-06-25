const express = require('express');
const router = express.Router();
const adding = require('../modules/adding');
router.post('/adding',  adding.adding);
router.post('/login',  adding.login);

module.exports = router;