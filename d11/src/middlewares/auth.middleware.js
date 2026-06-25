const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            message:"Unauthorized User"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await userModel.findById(decode.id)

        req.user = user;

        next();

    } catch (error) {
        throw error
    }
}

module.exports = authUser;