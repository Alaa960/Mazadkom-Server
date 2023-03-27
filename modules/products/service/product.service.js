const knex = require('../../../DBConnection/DBConnection')
const { PRODUCTS, PRODUCTS_IMG, FILE_MANAGER } = require('../../main/TablesName')
//add product service
const AddProduct = async (product) => {
    const products = await knex(PRODUCTS).insert({
        user_id: product.user_id,
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
//get product by id 
const GetSingleProduct = async (product_id) => {
    const product = await knex(PRODUCTS).from(PRODUCTS, FILE_MANAGER).where('product_id', product_id).join(FILE_MANAGER).returning("*");
    return product[0];
}
module.exports = {
    AddProduct,
    ProductImages,
    GetProducts,
    GetSingleProduct
}