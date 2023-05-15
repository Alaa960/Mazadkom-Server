const express = require('express')
const { SendMessageController, GetMessagesController } = require('../controller/message.controller')
const Authenticated = require('../../authentication/middleware/authentication.middleware')
const router = express.Router()
router.post('/sendmessage/:to_user', [Authenticated], SendMessageController)
    .get('/getmessages/:from_user/:to_user-', [Authenticated], GetMessagesController)
module.exports = router