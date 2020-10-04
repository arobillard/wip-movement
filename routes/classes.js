const express = require('express');
const router = express.Router();
const classCtrl = require('../controllers/classes');

router.post('/', classCtrl.getAll);
router.post('/add', classCtrl.addOne);
router.post('/search/:search', classCtrl.getSearch);
router.post('/feature', classCtrl.getFeatured)
router.post('/random/:num', classCtrl.getRandom)
router.post('/similar/:id/:num', classCtrl.getSimilar)
router.post('/saves/:id', classCtrl.getSaves)
router.post('/user-classes', classCtrl.getUserClasses);
router.post('/:id', classCtrl.getOne);
router.post('/:id/comment', classCtrl.writeComment);
router.post('/:id/delete', classCtrl.deleteOne);

module.exports = router;