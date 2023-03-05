const FileCreateInput = require('../../fileManager/input/file.input');
const { fileCreate } = require('../../fileManager/service/file.service');
const AddProductInput = require('../input/product.input');
const { AddProduct, ProductImages } = require('../service/product.service');
const ProductImg = require('../input/product.img.input');
//add product controller 
const AddProductController = async (req, res) => {
    const files = req.files;
    const fileIds = files.map(async (file) => {
        let fileInput = new FileCreateInput();
        fileInput.new_name = file.fileName;
        fileInput.old_name = file.originalname;
        fileInput.path = file.path;
        const file_id = await fileCreate(fileInput);
        return file_id
    });
    let ids = await Promise.all(fileIds)
    const product = new AddProductInput()
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
module.exports = {
    AddProductController
}