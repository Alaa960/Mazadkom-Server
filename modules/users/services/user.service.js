const { USERS, PRODUCTS, PRODUCTS_IMG, AUCTIONS, FILE_MANAGER } = require('../../main/TablesName')
const knex = require('../../../DBConnection/DBConnection')
//user register service
const UserRegister = async (user) => {
    const userCreate = await knex(USERS).insert(
        {
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            isAdmin: false
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
        email: user.email
    })
    return updatedUser
}
//delete user by id 
const DeleteUserService = async (user_id) => {
    const products = await knex.from(PRODUCTS).where('user_id', user_id)
    const result = products.map(async (product) => {
        const images = await knex.from(PRODUCTS_IMG).where('product_id', product.product_id).join(FILE_MANAGER, 'filemanager.file_id', '=', 'products_img.img_id').del()
        product.images = images
    })
    const results = products.map(async (product) => {
        const images = await knex.from(AUCTIONS).where('product_id', product.product_id).del()
        product.images = images
    })
    await knex.from(PRODUCTS).where('products.user_id', user_id).del()
    const user = knex.from(USERS).where('user_id', user_id).del()

    return user;
}
module.exports = {
    UserRegister,
    getAllUsers,
    GetUser,
    Updateuser,
    DeleteUserService
}