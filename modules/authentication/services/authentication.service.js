const knex = require('../../../DBConnection/DBConnection')
const { USERS } = require('../../main/TablesName')
//Login user
const LoginUser = async (userCredential) => {
    const user = await knex(USERS).where('email', userCredential.email).where('password', userCredential.password).returning("*");
    return user;
}
module.exports = {
    LoginUser
} 