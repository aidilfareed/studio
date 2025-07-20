
'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that handles the chat conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ChatInputSchema, type ChatMessage } from '@/types/chat';

// Exported wrapper function to be called from the client
export async function chat(history: ChatMessage[]): Promise<string> {
  // Directly calling the flow is the intended pattern.
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

    // Correctly structure the ai.generate call
    const response = await ai.generate({
      system: systemPrompt,
      messages: history, // Pass the history array directly
      config: {
        temperature: 0.7,
      },
    });

    // Access the response text correctly
    return response.text;
  }
);
