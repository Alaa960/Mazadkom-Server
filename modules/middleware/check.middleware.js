const { GetSingleProduct } = require('../products/service/product.service')
const isAuther = async (req, res, next) => {
    const product = await GetSingleProduct(req.params.product_id)
    if (product.user_id === req.user.user_id) {
        next()
    } else {
        res.status(403).json({
            error: 'forbidden resource',
            message: 'this product not for you cannot delete it'
        })
    }
}
const isToUser = async (req, res, next) => {
    const product = await GetSingleProduct(req.params.product_id)
    if (product.user_id === req.user.user_id) {
        next()
    } else {
        res.status(403).json({
            error: 'forbidden resource',
            message: 'this product not for you'
        })
    }
}
module.exports = {
    isAuther,
    isToUser
}