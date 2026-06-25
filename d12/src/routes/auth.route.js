const express = require("express");
const { registerConroller, loginController } = require("../controllers/auth.controller");


const router = express.Router();



router.post('/register',registerConroller)
router.post('/login',loginController)

module.exports = router;


