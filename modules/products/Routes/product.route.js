const express = require('express');
const Authenticated = require('../../authentication/middleware/authentication.middleware');
const upload = require('../../fileManager/helper/multerObj');
const router = express.Router();
const { AddProductController, GetAllProducts, GetProductById } = require('../controller/product.controller')
const { PorductValidation } = require('../validation/product.validation')
const { IsAdmin, isUser } = require('../../middleware/role.middleware')
router.post('/add', [Authenticated, isUser], upload.array('photo', 10), PorductValidation, AddProductController)
    .get('/products', GetAllProducts)
    .get('/product/:product_id', GetProductById)
module.exports = router