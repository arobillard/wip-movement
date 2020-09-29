const express = require('express');
const router = express.Router();
const classCtrl = require('../controllers/classes');

router.post('/', classCtrl.getAll);
router.post('/add', classCtrl.addOne);
router.post('/search/:search', classCtrl.getSearch);
router.post('/feature', classCtrl.getFeatured)
router.post('/random', classCtrl.getRandom)
router.post('/:id', classCtrl.getOne);

module.exports = router;