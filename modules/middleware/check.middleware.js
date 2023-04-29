const { GetSingleProduct, GetUserProducts } = require('../products/service/product.service')
const isAuther = async (req, res, next) => {
    const product = await GetUserProducts(req.params.product_id)
    if (product.user_id === req.user_id) {
        next()
    } else {
        res.status(403).json({
            error: 'forbidden resource',
            message: 'this product not for you cannot delete it'
        })
    }
}
module.exports = isAuther