const postModel = require("../models/post.model");
const generateCaption = require("../services/Ai.service");
const uploadFile = require("../services/storage.service");
const  { v4:uuidv4 }  = require("uuid");


const createPostContoller = async(req,res)=>{
    const file= req.file;
    
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
    
    const caption = await generateCaption(base64ImageFile);

    const result = await uploadFile(file.buffer,`${uuidv4()}`)

    const post = await postModel.create({
        image:result.url,
        caption,
        user:req.user._id
    })
    res.status(200).json({
        message:"Caption Created",
        post
    })
}

module.exports = {createPostContoller};