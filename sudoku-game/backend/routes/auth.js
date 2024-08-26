const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: "Çok fazla giriş denemesi yaptınız. Lütfen 15 dakika sonra tekrar deneyin."
});

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);

module.exports = router;
