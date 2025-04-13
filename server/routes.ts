import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema, chatResponseSchema } from "@shared/schema";
import { generateResponse } from "./api/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request
      const result = chatRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request", 
          error: result.error.message 
        });
      }
      
      const { message } = result.data;
      
      // Generate response using OpenAI
      const response = await generateResponse(message);
      
      // Always return a successful response now that we have fallbacks
      return res.status(200).json({ 
        message: response 
      });
    } catch (error) {
      console.error("Error in chat API:", error);
      
      // Provide a generic fallback response even if something unexpected happens
      return res.status(200).json({ 
        message: "I'm sorry, I'm experiencing technical difficulties connecting to my knowledge base. Please try again later or consult a healthcare professional for medical information."
      });
    }
  });

  // Test endpoint to verify API is working
  app.get("/api/health", (_, res) => {
    res.status(200).json({ status: "ok" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
