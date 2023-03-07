const express = require('express');
const upload = require('../../fileManager/helper/multerObj');
const router = express.Router();
const { AddProductController, GetAllProducts } = require('../controller/product.controller')
router.post('/add', upload.array('photo', 5), AddProductController)
    .get('/products', GetAllProducts)
module.exports = router