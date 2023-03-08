const express = require('express');
const upload = require('../../fileManager/helper/multerObj');
const router = express.Router();
const { AddProductController, GetAllProducts, GetProductById } = require('../controller/product.controller')
const { PorductValidation } = require('../validation/product.validation')
router.post('/add', upload.array('photo', 10), PorductValidation, AddProductController)
    .get('/products', GetAllProducts)
    .get('/product/:product_id', GetProductById)
module.exports = router