const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.header('X-auth-token');
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.userId = userId;
        req.isAdmin = decodedToken.isAdmin
        next();
    } catch {
        res.status(401).json ({
            error: new Error('invalide request !')
        })
    }
}