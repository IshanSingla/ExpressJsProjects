const express = require('express');
const router = express.Router();
const adding = require('../modules/sub4sub');
router.post('/InstaLogin',  adding.InstaLogin);
router.post('/InstaFollow',  adding.InstaFollow);
router.post('/InstaCheck',  adding.InstaCheck);

module.exports = router;