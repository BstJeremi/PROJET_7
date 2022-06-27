const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.header('X-auth-token');
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json ({
            error: new Error('invalide request !')
        })
    }
}