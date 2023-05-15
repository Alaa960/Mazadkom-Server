const MessageInput = require('../input/message.input')
const { SendMessageServices, GetMessagesServices } = require('../services/message.services')
//send message controller
const SendMessageController = async (req, res) => {
    const { to_user } = req.params;
    const { message_content } = req.body;
    const message = new MessageInput()
    const from_user = req.user.user_id
    message.from_user = from_user
    message.message_content = message_content;
    message.to_user = to_user;
    const messages = await SendMessageServices(message)
    res.json({
        message: messages
    })
}
//get messages controller
const GetMessagesController = async (req, res) => {
    const { from_user, to_user } = req.params;
    const messages = await GetMessagesServices(from_user, to_user)
    res.send(messages)
}
module.exports = {
    SendMessageController,
    GetMessagesController
}