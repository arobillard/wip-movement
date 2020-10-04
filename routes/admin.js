const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.post('/classes', adminCtrl.getAllClasses);
router.post('/classes/:id', adminCtrl.getOneClass);
router.post('/upload-class', adminCtrl.uploadClassToAmazon);
router.post('/upload-screenshot', adminCtrl.uploadScreenshotToAmazon);

module.exports = router;