const express = require('express');
const router = express.Router();
const classCtrl = require('../controllers/classes');

router.post('/', classCtrl.getAll);
router.post('/add', classCtrl.addOne);
router.post('/:id', classCtrl.getOne);
router.post('/search/:search', classCtrl.getSearch);

module.exports = router;