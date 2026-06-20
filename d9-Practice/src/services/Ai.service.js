const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateCaption(base64ImageFile) {


  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];



  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction: `
            You are an expert in generating captions for images.
            you generate single captions for the image.
            your captions should be shprt and concise.
            you use hastags and emojis in the captions
      `
    }
  });

  return response.text;
}

module.exports = generateCaption;



