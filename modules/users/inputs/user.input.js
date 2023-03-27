class UserInput {
    constructor(email, name, password, phone, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isAdmin = isAdmin;
    }
}
module.exports = UserInput;