class AddProductInput {
    constructor(category, title, initial_price, time, description) {
        this.category = category;
        this.title = title;
        this.initial_price = initial_price;
        this.time = time;
        this.description = description;
    }
}
module.exports = AddProductInput