import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'assistant']),
  content: z.string(),
});

export const ChatInputSchema = z.array(ChatMessageSchema);

export type ChatMessage = z.infer<typeof ChatMessageSchema>;