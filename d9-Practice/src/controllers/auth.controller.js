const userModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const registerController = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username: username,
        password: await bcrypt.hash(password, 8)
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.status(200).json({
        message: "User Registered Successfully",
        user
    })
}


const loginController = async (req, res) => {
   const { username, password } = req.body;

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.status(400).json({
            message: "User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "User Password is incorrect"
        })
    }


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);


    res.status(200).json({
        message: "User Logged Successfully"
    })
}

module.exports = {registerController,loginController};