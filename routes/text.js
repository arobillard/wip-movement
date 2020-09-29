const express = require('express');
const router = express.Router();
const txtCtrl = require('../controllers/text');

router.post('/director', txtCtrl.director);

module.exports = router;