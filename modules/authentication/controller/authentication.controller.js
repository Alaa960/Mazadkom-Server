const { validationResult } = require('express-validator');
const { LoginUser } = require('../services/authentication.service')
const LoginInput = require('../input/authentication.input');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//user login
const UserLoginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()
        })
    }
    const { email, password } = req.body;
    const userCredential = new LoginInput();
    userCredential.email = email;
    userCredential.password = password;
    const user = await LoginUser(userCredential);
    if (user) {
        if (comparePassword(password, user.password)) {
            const token = jwt.sign({ user }, 'Secret', { expiresIn: 60000 * 600000 });
            return res.json({
                user: user,
                token: token
            });
        }
        return res.status(400).json({
            error: 'wrong password'
        })
    }
    res.status(404).json({
        error: 'User not found'
    });
}
const comparePassword = (passwrod, hash) => {
    return bcrypt.compareSync(passwrod, hash)
}
module.exports = {
    UserLoginController,
    comparePassword
}