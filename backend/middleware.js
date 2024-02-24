const { JWT_SECRET } = require("./config")

const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid auth header found"
        });
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedData = jwt.verify(token, JWT_SECRET)
        req.userId = decodedData.userId
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Error while validating user"
        })
    }
}

module.exports = {
    authMiddleware
}