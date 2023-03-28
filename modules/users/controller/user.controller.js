const { validationResult } = require('express-validator');
const UserInput = require('../inputs/user.input');
const { UserRegister, getAllUsers, GetUser, Updateuser, DeleteUserService } = require('../services/user.service');
const UpdateUserInput = require('../inputs/update.user.input');
var bcrypt = require('bcryptjs');

//user register
const UserRegisterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()
        })
    }
    const user = new UserInput()
    const { name, email, password, phone, isAdmin } = req.body;
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    user.phone = phone;
    user.isAdmin = isAdmin;
    let RegisterdUser = await UserRegister(user);
    res.json({
        result: RegisterdUser
    })
}
//get all users controller 
const GetAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({
        users: users
    })

}
//get user by id 
const getUserById = async (req, res) => {
    const { user_id } = req.params;
    const user = await GetUser(user_id)
    if (user.length > 0) {
        return res.status(200).json({
            user: user
        })
    }
    res.status(400).json({
        error: 'User not found'
    })
}
//update user by id 
const UpdateUserById = async (req, res) => {
    const user = new UpdateUserInput()
    const { user_id } = req.params;
    const { name, password, phone } = req.body;
    user.name = name;
    user.password = password;
    user.phone = phone;
    const updateUser = await Updateuser(user_id, user)
    return res.status(200).json({
        success: true
    })
}
//delete user by id 
const DeleteUserById = async (req, res) => {
    const { user_id } = req.params;
    const deletedUser = await DeleteUserService(user_id);
    res.status(200).json({
        success: true
    })
}
module.exports = {
    UserRegisterController,
    GetAllUsersController,
    getUserById,
    UpdateUserById,
    DeleteUserById
}