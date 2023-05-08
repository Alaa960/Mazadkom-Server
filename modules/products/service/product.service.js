
const knex = require('../../../DBConnection/DBConnection')
const { PRODUCTS, PRODUCTS_IMG, FILE_MANAGER, AUCTIONS, USERS } = require('../../main/TablesName')
//add product service
const AddProduct = async (product) => {
    const products = await knex(PRODUCTS).insert({
        user_id: product.user_id,
        category: product.category,
        title: product.title,
        time: product.time,
        initial_price: product.initial_price,
        description: product.description,
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
    console.log(product_id)
    const product = await knex(PRODUCTS)
        .join(PRODUCTS_IMG, 'products.product_id', '=', 'products_img.product_id')
        .join(FILE_MANAGER, 'filemanager.file_id', '=', 'products_img.img_id')
        .where('products.product_id', product_id)
        .join(USERS, function () {
            this.on('users.user_id', '=', 'products.user_id')
        })
    return product[0]
}
//delete product
const DeleteProduct = async (product_id) => {
    const deletedIMG = await knex.from(PRODUCTS_IMG).where('product_id', product_id).del()
    const deletedAUC = await knex.from(AUCTIONS).where('product_id', product_id).del()
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
//make an auction service
const MakeAnAuctionService = async (auction) => {
    console.log(auction)
    const auctions = await knex.from(AUCTIONS).where('user_id', auction.user_id).where('product_id', auction.product_id).insert({
        mount_auction: auction.mount_auction,
        user_id: auction.user_id,
        product_id: auction.product_id
    })
    return auctions
}
//get greater mount
const getGreaterAuction = async (product_id) => {
    const max_auction = await knex.from(AUCTIONS).where('product_id', product_id).max('mount_auction', { as: 'mount_auction' });
    return max_auction[0];
}
module.exports = {
    AddProduct,
    ProductImages,
    GetProducts,
    GetSingleProduct,
    DeleteProduct,
    GetUserProducts,
    MakeAnAuctionService,
    getGreaterAuction
}