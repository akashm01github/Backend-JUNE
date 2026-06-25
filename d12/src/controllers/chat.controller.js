const chatModel = require("../models/chat.model");

const createChat = async(req, res)=>{
    const {title} = req.body;
    
    const user = req.user;


    const chat = await chatModel.create({
        user:user._id,
        title
    })

    res.status(200).json({
        message:"Chat is Created"
    })
}


module.exports = createChat;

