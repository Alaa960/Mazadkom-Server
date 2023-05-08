const express = require('express')
const { makeReport } = require('../controller/reports.controller')
const Authenticated = require('../../authentication/middleware/authentication.middleware')
const { isUser } = require('../../middleware/role.middleware')
const router = express.Router()
router.post('/report', [Authenticated, isUser], makeReport)
module.exports = router