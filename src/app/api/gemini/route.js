import { GoogleGenerativeAI } from "@google/generative-ai";

export  async function POST(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const response = new Response(JSON.stringify({ message: "Missing API key" }));
    return response;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const jsonData = await req.json();
  const prompt = jsonData.prompt;

  if (!prompt) {
    const response = new Response(JSON.stringify({ message: "Missing prompt" }));
    return response;
  }
  try {
    // const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: { maxOutputTokens: 200 }});
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const response1 = await model.generateContent(prompt);
    const response = new Response(JSON.stringify({ response1}));
    return response;

  } catch (error) {
    console.error(error);
    const response = new Response(JSON.stringify({ message: "Error generating text" }));
    return response;
  }
}
