const express = require('express');
const router = express.Router();
const { UserRegisterValidation } = require('../validation/user.validation');
const { UserRegisterController } = require('../controller/user.controller')
router.post('/register', UserRegisterValidation, UserRegisterController)
module.exports = router;