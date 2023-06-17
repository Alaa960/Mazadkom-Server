const express = require('express')
const { makeReport, getAllReportsController } = require('../controller/reports.controller')
const Authenticated = require('../../authentication/middleware/authentication.middleware')
const { isUser, IsAdmin } = require('../../middleware/role.middleware')
const router = express.Router()
router.post('/report/:user_id', [Authenticated, isUser], makeReport)
    .get('/reports', [Authenticated, IsAdmin], getAllReportsController)
module.exports = router