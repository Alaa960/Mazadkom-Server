const { check } = require('express-validator');
const title = check('title', 'The name of product is required').notEmpty();
const initial_price = check('initial_price', 'The initial price of product is required').notEmpty();
const category = check('category', 'The category of product is required').notEmpty();
const time = check('time', 'The time of product is required').notEmpty();
const description = check('description', 'the description is required').notEmpty()
const PorductValidation = [
    initial_price,
    time,
    title,
    category,
    description
]
module.exports = {
    PorductValidation
}