const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/save-class', userCtrl.saveClass);
router.post('/unsave-class', userCtrl.unSaveClass);

module.exports = router;