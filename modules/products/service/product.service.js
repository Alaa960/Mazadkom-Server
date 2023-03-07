const knex = require('../../../DBConnection/DBConnection')
const { PRODUCTS, PRODUCTS_IMG, FILE_MANAGER } = require('../../main/TablesName')
//add product service
const AddProduct = async (product) => {
    const products = await knex(PRODUCTS).insert({
        category: product.category,
        title: product.title,
        time: product.time,
        initial_price: product.initial_price,
    })
    return products;
}
//product images
const ProductImages = async (productImg) => {
    await knex(PRODUCTS_IMG).insert({
        product_id: productImg.product_id,
        img_id: productImg.img_id
    })
}
//get all products
const GetProducts = async () => {
    const products = await knex(PRODUCTS).from(PRODUCTS, PRODUCTS_IMG, FILE_MANAGER).join(FILE_MANAGER)
        .returning('*')
    return products
}
module.exports = {
    AddProduct,
    ProductImages,
    GetProducts
}