const generateCaptions = require("../services/Ai.service");


async function createPostController(req,res) {
    const file = req.file;
    
    // console.log(file)
    //CONVERT BASE64
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')

    const captions = await generateCaptions(base64ImageFile);

    res.status(200).json({
        messsage:"Captions Generated",
        captions
    })
}


module.exports = {
    createPostController
}