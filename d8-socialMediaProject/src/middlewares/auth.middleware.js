const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Token Not Found"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({
            _id: decode.id
        })

        req.user = user;

        next()

    } catch (error) {
        throw error;
    }


}


module.exports = { authMiddleware };