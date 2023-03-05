class FileCreateInput {
    constructor(old_name, new_name, path) {
        this.new_name = new_name;
        this.old_name = old_name;
        this.path = path
    }
}
module.exports = FileCreateInput