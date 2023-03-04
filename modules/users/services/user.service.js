const { USERS } = require('../../main/TablesName')
const knex = require('../../../DBConnection/DBConnection')
//user register service
const UserRegister = async (user) => {
    const userCreate = await knex(USERS).insert(
        {
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone
        }
    )
    return user;
}
//get all users 
const getAllUsers = async () => {
    const allUsers = knex(USERS).returning('*');
    return allUsers
}
//get user by id service
const GetUser = async (user_id) => {
    const user = await knex(USERS).where('user_id', user_id).returning('*');
    return user;
}
//update user by id 
const Updateuser = async (user_id, user) => {
    const updatedUser = await knex(USERS).where('user_id', user_id).update({
        name: user.name,
        password: user.password,
        phone: user.phone
    })
    return updatedUser
}
//delete user by id 
const DeleteUserService = async (user_id) => {
    const user = await knex(USERS).where('user_id', user_id).del();
    return user;
}
module.exports = {
    UserRegister,
    getAllUsers,
    GetUser,
    Updateuser,
    DeleteUserService
}