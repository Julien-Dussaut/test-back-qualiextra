const express = require('express');
const router = express.Router();

const auth = require('../middlewares/Auth');
const isAdmin = require('../middlewares/isAdmin');
const { validateUserCreate, validateUserUpdate, handleValidationErrors } = require('../middlewares/userValidator');
const { resendEmailLimiter } = require('../middlewares/security');

const userController = require('../controllers/UserController');

router.get('/users/list', auth, isAdmin, userController.userList);
router.post('/users/create', validateUserCreate, handleValidationErrors, userController.userCreate);
router.get('/users/:id', auth, userController.userRead);
router.patch('/users/:id', auth, validateUserUpdate, handleValidationErrors, userController.userUpdate);
router.delete('/users/:id', auth, isAdmin, userController.userDelete);

router.get('/verify-email/:token', userController.userVerify);
router.post('/resend-email', resendEmailLimiter, userController.resendVerificationEmail);

module.exports = router;