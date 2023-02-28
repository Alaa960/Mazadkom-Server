const { USERS } = require('../../main/TablesName')
const knex = require('../../../DBConnection/DBConnection')
//user service
const UserRegister = async (user) => {
    const userCreate = await knex(USERS).insert(
        {
            email: user.email,
            name: user.name,
            password: user.password
        }
    )
    return user;
}
module.exports = {
    UserRegister
}