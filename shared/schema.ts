import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat messages for storing conversations
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  userId: true,
  content: true,
  role: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Chatbot request schema
export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Chatbot response schema
export const chatResponseSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Medicine information for reference
export const medicines = pgTable("medicines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  usage: text("usage").notNull(),
  sideEffects: text("side_effects"),
  dosage: text("dosage"),
});

// Government schemes
export const govSchemes = pgTable("gov_schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  eligibility: text("eligibility"),
  benefits: text("benefits"),
  link: text("link"),
});
