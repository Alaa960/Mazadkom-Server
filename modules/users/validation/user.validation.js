const { check } = require('express-validator');
const name = check('name', 'the name is required').notEmpty();
const email = check('email', 'the email is required').notEmpty();
const password = check('password', 'the password is required').notEmpty();
const UserRegisterValidation = [
    name,
    email,
    password
]
const UserLoginValidation = [
    email,
    password
]
module.exports = {
    UserRegisterValidation,
    UserLoginValidation
}