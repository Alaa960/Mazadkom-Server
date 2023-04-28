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
    const products = await knex.from(PRODUCTS).join(PRODUCTS_IMG, function () {
        this.on('products.product_id', '=', 'products_img.product_id')
    }).join(FILE_MANAGER, function () {
        this.on('filemanager.file_id', '=', 'products_img.img_id')
    })
    return products
}

//get product by id 
const GetSingleProduct = async (product_id) => {
    const product = await knex(PRODUCTS).from(PRODUCTS, FILE_MANAGER).where('product_id', product_id).join(FILE_MANAGER).returning("*");
    return product[0];
}
//delete product
const DeleteProduct = async (product_id) => {
    const deletedIMG = await knex.from(PRODUCTS_IMG).where('product_id', product_id).del()
    const deleted = await knex.from(PRODUCTS).where('product_id', product_id).del()
    return deleted
}
//get user products
const GetUserProducts = async (user_id) => {
    const products = await knex.from(PRODUCTS).where('user_id', user_id).join(PRODUCTS_IMG, function () {
        this.on('products.product_id', '=', 'products_img.product_id')
    }).join(FILE_MANAGER, function () {
        this.on('filemanager.file_id', '=', 'products_img.img_id')
    })
    return products
}
module.exports = {
    AddProduct,
    ProductImages,
    GetProducts,
    GetSingleProduct,
    DeleteProduct,
    GetUserProducts
}