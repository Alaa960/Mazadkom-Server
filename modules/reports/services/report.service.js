const knex = require('../../../DBConnection/DBConnection')
const { REPORTS } = require('../../main/TablesName')
//make report service into DB 
const MakeReportService = async (report) => {
    const reports = await knex(REPORTS).insert({
        user_id: report.user_id,
        report_content: report.report_content
    })
    return reports
}
module.exports = {
    MakeReportService
}