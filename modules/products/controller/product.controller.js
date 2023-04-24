const FileCreateInput = require('../../fileManager/input/file.input');
const { fileCreate } = require('../../fileManager/service/file.service');
const AddProductInput = require('../input/product.input');
const { AddProduct, ProductImages, GetProducts, GetSingleProduct, GetProductsImages } = require('../service/product.service');
const ProductImg = require('../input/product.img.input');
const { validationResult } = require('express-validator');
//add product controller 
const AddProductController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()
        })
    }
    const files = req.files;
    const fileIds = files.map(async (file) => {
        let fileInput = new FileCreateInput();
        fileInput.new_name = file.filename;
        fileInput.old_name = file.originalname;
        fileInput.path = file.path;
        const file_id = await fileCreate(fileInput);
        return file_id
    });
    let ids = await Promise.all(fileIds)
    const product = new AddProductInput()
    const user_id = req.user.user_id;
    product.user_id = user_id;
    const { category, title, initial_price, time } = req.body;

    product.category = category;
    product.title = title;
    product.initial_price = initial_price;
    product.time = time;
    const AddeddProductId = await AddProduct(product);
    ids.forEach(async (id) => {
        let productImg = new ProductImg();
        productImg.img_id = id;
        productImg.product_id = AddeddProductId;
        await ProductImages(productImg)
    })
    res.status(201).json({
        result: AddeddProductId
    })
}
//get all products
const GetAllProducts = async (req, res) => {
    const products = await GetProducts()
    const images = await GetProductsImages()
    res.status(200).json({
        products: products, images
    })
}
//get single product
const GetProductById = async (req, res) => {
    const { product_id } = req.params;
    const product = await GetSingleProduct(product_id);
    res.status(200).json({
        product: product
    })
}

module.exports = {
    AddProductController,
    GetAllProducts,
    GetProductById
}