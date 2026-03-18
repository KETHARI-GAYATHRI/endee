const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const testGemini = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  try {
    console.log('Testing Gemini with key:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
    const result = await model.generateContent("Hello, respond with JSON: { 'status': 'ok' }");
    const response = await result.response;
    console.log('GEMINI RESPONSE:', response.text());
  } catch (error) {
    console.error('GEMINI TEST FAILED:', error.message);
  }
};

testGemini();
