const { validationResult } = require('express-validator');
const { LoginUser } = require('../services/authentication.service')
const LoginInput = require('../input/authentication.input');
const jwt = require('jsonwebtoken');
//user login
const UserLoginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()
        })
    }
    const userCredential = new LoginInput();
    const { email, password } = req.body;
    userCredential.email = email;
    userCredential.password = password;
    let user = await LoginUser(userCredential)
    if (user.length > 0) {
        const accessToken = jwt.sign({ user }, 'Secret', { expiresIn: 60 * 60 });
        res.json({
            user: user[0],
            accessToken: accessToken
        })
    }
    res.json({
        error: 'invalid credential'
    })
}
module.exports = {
    UserLoginController
}