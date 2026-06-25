const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const registerController = async(req,res)=>{
    const {fullName:{firstName,lastName},email,password} = req.body;


    const isUserAlreadyExists = await userModel.findOne({
        email
    });


    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const user = await userModel.create({
        fullName:{firstName,lastName},
        email,
        password: await bcrypt.hash(password,10)
    })


    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"User Registered Successfully",
        user
    })

}

const loginController = async(req,res)=>{
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Password is Not Valid"
        })
    }


    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie("token",token);


    res.status(200).json({
        message:"User Logged in Successfully"
    })
}




module.exports = {registerController,loginController};