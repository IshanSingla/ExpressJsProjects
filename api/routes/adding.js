const express = require('express');
const router = express.Router();
const adding = require('../modules/adding');
router.post('/adding',  adding.adding);

module.exports = router;