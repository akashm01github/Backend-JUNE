const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");



//! REGISTER CONTROLLER  
async function registerController(req, res) {
    const { username, password } = req.body;

    const isuserAlreadyExists = await userModel.findOne({
        username
    })

    if (isuserAlreadyExists) {
        return res.status(200).json({
            message: "User Already Registered"
        })
    }

    const user = await userModel.create({
        username:username,
        password:await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"User Registered Successfully"
    })
}

//! LOGIN CONTROLLER 
async function loginController(req, res) {
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username:username
    });

    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
          return res.status(400).json({
            message:"User Password Not Valid"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"Successfully Logged In"
    })

}

module.exports = { registerController, loginController }