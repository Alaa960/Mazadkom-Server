const knex = require('../../../DBConnection/DBConnection')
const { MESSAGES, USERS } = require('../../main/TablesName')
//send message services 
const SendMessageServices = async (message) => {
    const messages = await knex(MESSAGES).insert({
        message_content: message.message_content,
        to_user: message.to_user,
        from_user: message.from_user
    })
    return messages
}
//get messages services
const GetMessagesServices = async (from_user) => {
    const messages = await knex(MESSAGES).join(USERS, function () {
        this.on('users.user_id', '=', 'messages.to_user')
    }).where('messages.to_user', '=', from_user)
    return messages
}
module.exports = {
    SendMessageServices,
    GetMessagesServices
}