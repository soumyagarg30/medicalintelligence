import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Model selection - using the latest available Gemini model
const MODEL_NAME = "gemini-1.5-pro";

// System prompt to guide the model's responses
const SYSTEM_PROMPT = `
You are MediBot, a medical assistant specializing in:
1. Information about medicines (usage, side effects, interactions)
2. General knowledge about diseases and medical conditions
3. Detailed information about Indian government medical schemes

Important guidelines:
- Provide accurate, concise information based on medical facts
- For medicine questions, mention common dosages, uses, and side effects
- For disease questions, cover symptoms, treatments, and prevention
- For Indian government schemes, provide eligibility criteria and benefits
- Always mention if someone should consult a healthcare professional for medical advice
- If you're unsure about something, acknowledge your limitations rather than making up information
- When discussing medicines, mention the scientific name and common brand names
- Format your answers clearly with appropriate paragraph breaks for readability
- For complex topics, use numbered or bulleted lists
- DO NOT provide personal medical advice or diagnose conditions
- Include a disclaimer when discussing medical topics

Remember you are a medical information resource, not a replacement for professional medical advice.
`;

/**
 * Generates a response to a user query using Google's Gemini API
 * @param message The user's message
 * @returns The assistant's response
 */
export async function generateGeminiResponse(message: string): Promise<string> {
  if (!geminiApiKey) {
    throw new Error("Gemini API key not found. Please check your environment variables.");
  }

  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Use system prompt + user message
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Please act as a medical assistant according to these instructions: " + SYSTEM_PROMPT }],
        },
        {
          role: "model", 
          parts: [{ text: "I'll serve as MediBot, a specialized medical assistant focusing on medicines, diseases, and Indian government medical schemes. I'll provide accurate, concise information while following your guidelines for format and content. I'll mention when professional medical consultation is needed and acknowledge my limitations when appropriate. I understand I should not provide personal medical advice or diagnoses. I'm ready to assist with medical information queries now." }],
        },
      ],
    });
    
    // Send the message and get a response
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    if (error instanceof Error) {
      throw new Error(`Error generating Gemini response: ${error.message}`);
    }
    
    throw new Error("An unknown error occurred while generating a Gemini response.");
  }
}