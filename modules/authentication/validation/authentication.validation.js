const { check } = require('express-validator');
const email = check('email', 'email is required to login').notEmpty();
const password = check('password', 'password is required to login').notEmpty();
const LoginValidationAuthentication = [
    email,
    password
]
module.exports = {
    LoginValidationAuthentication
}