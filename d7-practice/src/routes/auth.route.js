const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');



const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username: username,
        password: password
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message: "User Successfully Registered",
        user
    })
})






// LOGIN

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // console.log(username, password);

    const isUserExists = await userModel.findOne({
        username: username
    });

    if (!isUserExists) {
        return res.status(400).json({
            message: "User Not Found"
        })
    }

    const isPasswordValid = password == isUserExists.password;

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "User Password is Incorrect"
        })
    }

    res.status(200).json({
        messsage: "User Loggedin"
    })
})


// USER
router.get('/user', async (req, res) => {
    const { token } = req.cookies;


    if (!token) {
        return res.status(200).json({
            message: "Unauthorized User"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({
            _id: decode.id
        })


        res.status(200).send(user);


    } catch (error) {
        throw error
    }
})

module.exports = router;