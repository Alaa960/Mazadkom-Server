const IsAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({
            error: 'forbidden resource'
        })
    }
}
const isUser = (req, res, next) => {
    if (!req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({
            error: 'forbidden resource'
        })
    }
}
module.exports = {
    IsAdmin,
    isUser
}