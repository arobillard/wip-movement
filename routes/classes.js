const express = require('express');
const router = express.Router();
const classCtrl = require('../controllers/classes');

router.post('/autocomplete', classCtrl.getAutoComplete)
router.post('/:id', classCtrl.getOne)

module.exports = router;