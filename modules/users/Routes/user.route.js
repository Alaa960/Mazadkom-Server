const express = require('express');
const router = express.Router();
const { UserRegisterValidation } = require('../validation/user.validation');
const { UserRegisterController, GetAllUsersController, getUserById, UpdateUserById, DeleteUserById } = require('../controller/user.controller');
const Authenticated = require('../../authentication/middleware/authentication.middleware');
const { IsAdmin, isUser } = require('../../middleware/role.middleware');
router.post('/register', UserRegisterValidation, UserRegisterController) //regitser user
    .get('/allUsers', [Authenticated, isUser], GetAllUsersController)//get all users
    .get('/user/:user_id', getUserById)//get user by id
    .put('/updateUser/:user_id', UpdateUserById)//update user
    .delete('/user/:user_id', [Authenticated, IsAdmin], DeleteUserById)//delete user
module.exports = router;