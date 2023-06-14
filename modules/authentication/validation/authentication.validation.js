const { check } = require('express-validator');
const email = check('email', 'email is required to login').notEmpty();
const password = check('password', 'password is required to login').notEmpty();
const notFound = 'User not found';
const LoginValidationAuthentication = [
    email,
    password
]
const UserNotFound = [
    notFound
]
module.exports = {
    LoginValidationAuthentication,
    UserNotFound
}