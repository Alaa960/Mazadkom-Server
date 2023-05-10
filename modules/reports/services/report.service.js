const knex = require('../../../DBConnection/DBConnection')
const { REPORTS, USERS } = require('../../main/TablesName')
//make report service into DB 
const MakeReportService = async (report, user_id) => {
    const reports = await knex(REPORTS).insert({
        report_content: report.report_content,
        user_id: report.user_id
    }).where('user_id', report.user_id)
    return reports
}
//get all reports service
const getReports = async () => {
    const reports = await knex.from(REPORTS).join(USERS, function () {
        this.on('reports.user_id', '=', 'users.user_id')
    })
    return reports
}
module.exports = {
    MakeReportService,
    getReports
}