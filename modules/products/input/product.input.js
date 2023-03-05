class AddProductInput {
    constructor(category, title, initial_price, time) {
        this.category = category;
        this.title = title;
        this.initial_price = initial_price;
        this.time = time;
    }
}
module.exports = AddProductInput