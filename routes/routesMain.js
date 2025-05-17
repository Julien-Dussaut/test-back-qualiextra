const express = require('express');
const router = express.Router();

const auth = require('../middlewares/Auth');
const { limiterLogin } = require('../middlewares/security');

const mainController = require('../controllers/MainController');

// Limiter login applied on this route
router.post('/login', limiterLogin, mainController.login);

router.get('/private', auth, (req, res) => {
  res.send(`Hello ${req.auth.userFirstName}`);
});

module.exports = router;