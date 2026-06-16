const express = require('express');
const userModel = require('../models/user.model');

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { registerController, loginController } = require('../controllers/auth.controller');


//! REGISTER 
router.post('/register',registerController);


//! LOGIN
router.post('/login',loginController);



module.exports = router;


