const jwt = require('jsonwebtoken');
const Authenticated = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        try {
            const user = jwt.verify(token, 'Secret');
            req.user = user.user;
            next();
        } catch (err) {
            return res.json({
                error: 'invalid token'
            })
        }
    } else {
        res.json({
            error: 'token does not exist'
        })
    }

}
module.exports = Authenticated