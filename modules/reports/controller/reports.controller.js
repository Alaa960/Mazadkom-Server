const MakeReport = require('../input/report.input')
const { MakeReportService } = require('../services/report.service')
//make a report
const makeReport = async (req, res) => {
    const report = new MakeReport()
    const user_id = req.user.user_id // the user id ti make a report for
    report.user_id = user_id
    const { report_content } = req.body // the content of report in the form body
    report.report_content = report_content
    const makereports = await MakeReportService(report)
    res.status(201).json({
        reports: makereports
    })
}
module.exports = {
    makeReport
}