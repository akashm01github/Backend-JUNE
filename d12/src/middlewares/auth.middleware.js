const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authUser = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(404).json({
            messgae:"UnAuthorized User"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await userModel.findById(decoded.id)

        req.user = user;

        next();

    } catch (error) {
        throw error
    }
}


module.exports = authUser