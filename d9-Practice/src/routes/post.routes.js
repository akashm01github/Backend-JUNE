const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');
const { createPostContoller } = require('../controllers/post.controller');
const multer = require('multer');


const router = express.Router();

const uplaod = multer({storage:multer.memoryStorage()});

router.post('/',authMiddleware,uplaod.single("image"),createPostContoller)


module.exports = router