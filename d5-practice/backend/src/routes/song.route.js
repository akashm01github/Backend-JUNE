const express = require('express');
const multer  = require('multer')

const router = express.Router();


const upload  = multer({storage:multer.memoryStorage()});



router.post('/songs',upload.single("audio"),(req,res)=>{

    const data = req.body;

    const song = req.file;

    console.log(data,song);

    res.status(200).json({
        message:"Helo"
    })
})

module.exports = router;

