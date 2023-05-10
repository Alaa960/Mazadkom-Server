const MakeReport = require('../input/report.input')
const { MakeReportService, getReports } = require('../services/report.service')
//make a report
const makeReport = async (req, res) => {
    const report = new MakeReport()
    const { user_id } = req.params
    const { report_content } = req.body // the content of report in the form body
    report.report_content = report_content
    report.user_id = user_id
    const makereports = await MakeReportService(report, user_id)
    res.status(201).json({
        reports: makereports
    })
}
//get all reportscontroller 
const getAllReportsController = async (req, res) => {
    const reports = await getReports()
    res.status(200).json({
        reports: reports
    })
}
module.exports = {
    makeReport,
    getAllReportsController
}