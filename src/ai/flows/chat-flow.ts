
'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the schema for a single chat message
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the schema for the chat flow input (a history of messages)
const ChatInputSchema = z.array(ChatMessageSchema);

// Exported wrapper function to be called from the client
export async function chat(history: ChatMessage[]): Promise<string> {
  const result = await chatFlow(history);
  return result;
}

// Define the main chat flow
const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (history) => {
    const systemPrompt = `You are a helpful assistant for a company called Project Forge.
    Project Forge is a coding course that teaches users to build and ship an MVP in 30 days.
    Keep your answers concise and helpful.`;

    const model = ai.getModel();

    const response = await ai.generate({
      prompt: {
        system: systemPrompt,
        messages: history,
      },
      model: model,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
