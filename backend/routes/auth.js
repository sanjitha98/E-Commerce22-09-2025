const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authCtrl.register);

router.post('/login', authCtrl.login);
router.get('/profile', protect, authCtrl.profile);

module.exports = router;
