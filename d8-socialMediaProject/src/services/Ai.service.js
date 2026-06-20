const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateCaptions(fileDatabase64) {

    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: fileDatabase64,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction:`
            You are a expert and make best caption,
            make short and concise
            and use hastags and emogies
            make one short and oneline caption only
            `
        }
    });

    return response.text;
}

module.exports = generateCaptions;

