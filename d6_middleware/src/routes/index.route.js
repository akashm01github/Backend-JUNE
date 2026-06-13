const express = require('express');

const router = express.Router();


router.use((req,res,next)=>{
    console.log(`This is Middleware between Router and API`);
    next()
})

router.get('/home',(req,res)=>{
    res.status(200).json({
        message:"Hey! Welcome to this API"
    })
})


module.exports = router;


