import OpenAI from "openai";
import { generateGeminiResponse } from "./gemini";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "" 
});

// Should we try Gemini if OpenAI fails?
const useGeminiBackup = process.env.GEMINI_API_KEY ? true : false;

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

// Fallback responses for when both APIs are unavailable
const FALLBACK_RESPONSES = {
  medicines: "I'd be happy to provide information about medicines including usage, side effects, and interactions. However, I'm currently experiencing connectivity issues with my knowledge base. Please try again later or consult a healthcare professional for immediate medication information.",
  
  diseases: "I'd like to help with your question about medical conditions. Unfortunately, I'm currently experiencing connectivity issues with my knowledge base. For accurate information about symptoms, treatments, or prevention, please consult a healthcare professional or a reliable medical website.",
  
  schemes: "Information about Indian government medical schemes is important. While I'm currently experiencing connectivity issues with my database, you can find details about schemes like Ayushman Bharat, PM-JAY, and others on official government websites or by calling their helplines.",
  
  general: "I'm sorry, I'm currently experiencing technical difficulties connecting to my knowledge base. This may be due to API quota limitations. For medical information, please consult a qualified healthcare professional or visit reliable medical websites. Thank you for your understanding."
};

/**
 * Selects an appropriate fallback response based on message keywords
 */
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("medicine") || 
      lowerMessage.includes("drug") || 
      lowerMessage.includes("pill") || 
      lowerMessage.includes("tablet") ||
      lowerMessage.includes("prescription")) {
    return FALLBACK_RESPONSES.medicines;
  }
  
  if (lowerMessage.includes("disease") || 
      lowerMessage.includes("condition") || 
      lowerMessage.includes("symptom") || 
      lowerMessage.includes("syndrome") ||
      lowerMessage.includes("disorder")) {
    return FALLBACK_RESPONSES.diseases;
  }
  
  if (lowerMessage.includes("scheme") || 
      lowerMessage.includes("government") || 
      lowerMessage.includes("program") || 
      lowerMessage.includes("ayushman") ||
      lowerMessage.includes("pm-jay") ||
      lowerMessage.includes("insurance")) {
    return FALLBACK_RESPONSES.schemes;
  }
  
  return FALLBACK_RESPONSES.general;
}

/**
 * Attempts to generate a response using OpenAI
 */
async function tryOpenAI(message: string): Promise<string | null> {
  if (!openai.apiKey) {
    console.warn("OpenAI API key not found.");
    return null;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
}

/**
 * Attempts to generate a response using Gemini
 */
async function tryGemini(message: string): Promise<string | null> {
  if (!useGeminiBackup) {
    console.warn("Gemini API key not found.");
    return null;
  }

  try {
    return await generateGeminiResponse(message);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
}

/**
 * Generates a response to a user query, trying multiple AI models
 * @param message The user's message
 * @returns The assistant's response
 */
export async function generateResponse(message: string): Promise<string> {
  // First, try using OpenAI
  const openAIResponse = await tryOpenAI(message);
  if (openAIResponse) {
    return openAIResponse;
  }
  
  console.log("OpenAI failed. Trying Gemini API...");
  
  // If OpenAI fails and Gemini is available, try that
  if (useGeminiBackup) {
    const geminiResponse = await tryGemini(message);
    if (geminiResponse) {
      return geminiResponse;
    }
  }
  
  // If both fail, use the fallback response
  console.log("All AI APIs failed. Using fallback response.");
  return getFallbackResponse(message);
}
