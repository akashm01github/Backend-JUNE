const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const registerConroller = async (req, res) => {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    const isuserAlreadyExists = await userModel.findOne({ email });

    if (isuserAlreadyExists) {
        return res.status(404).json({
            message: "User Already Exists"
        })
    }

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password: await bcrypt.hash(password, 10)
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.status(200).json({
        message: "Registered Successfully"
    })

}



const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }


    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
         return res.status(404).json({
            message: "User Password Not Valid"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);


    res.status(200).json({
        messgae:"User Successfully Logged In"
    })


}

module.exports = { registerConroller ,loginController};

