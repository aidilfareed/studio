import { z } from 'zod';

// Define the schema for a single chat message
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the schema for the chat flow input (a history of messages)
export const ChatInputSchema = z.array(ChatMessageSchema);
