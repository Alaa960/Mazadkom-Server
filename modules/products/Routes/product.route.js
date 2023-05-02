const express = require('express');
const Authenticated = require('../../authentication/middleware/authentication.middleware');
const upload = require('../../fileManager/helper/multerObj');
const router = express.Router();
const { AddProductController, GetAllProducts, GetProductById, DeleteProductController, GetUsersProductsController, MakeAnAuction, getGreaterAuctionContaroller } = require('../controller/product.controller')
const { PorductValidation } = require('../validation/product.validation')
const { isUser } = require('../../middleware/role.middleware');
const isAuther = require('../../middleware/check.middleware');
router.post('/add', [Authenticated, isUser], upload.array('photo', 1), PorductValidation, AddProductController)
    .get('/products', [Authenticated], GetAllProducts)
    .get('/product/:product_id', [Authenticated, isUser], GetProductById)
    .get('/productsuser/:user_id', [Authenticated, isUser], GetUsersProductsController)
    .delete('/product/:product_id', [Authenticated, isUser, isAuther], DeleteProductController)
    .post('/auction/:product_id', [Authenticated, isUser], MakeAnAuction)
    .get('/maxauctionmount/:product_id', getGreaterAuctionContaroller)
module.exports = router