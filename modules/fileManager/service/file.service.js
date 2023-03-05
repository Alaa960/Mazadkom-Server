const knex = require('../../../DBConnection/DBConnection')
const { FILE_MANAGER } = require('../../main/TablesName');
//add file
const fileCreate = async (fileInput) => {
    const fileId = await knex(FILE_MANAGER).insert({
        old_name: fileInput.old_name,
        new_name: fileInput.new_name,
        path: fileInput.path
    })
    return fileId;
}
module.exports = {
    fileCreate
}