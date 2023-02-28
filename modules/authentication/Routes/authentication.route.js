const express = require('express');
const router = express.Router();
const { LoginValidationAuthentication } = require('../validation/authentication.validation');
const { UserLoginController } = require('../controller/authentication.controller')
router.post('/login', LoginValidationAuthentication, UserLoginController);
module.exports = router