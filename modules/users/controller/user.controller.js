const { validationResult } = require('express-validator');
const UserInput = require('../inputs/user.input');
const { UserRegister } = require('../services/user.service');
//user register
const UserRegisterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()
        })
    }
    const user = new UserInput()
    const { name, email, password } = req.body;
    user.name = name;
    user.email = email;
    user.password = password;
    let RegisterdUser = await UserRegister(user);
    res.json({
        result: RegisterdUser
    })
}

module.exports = {
    UserRegisterController,
}