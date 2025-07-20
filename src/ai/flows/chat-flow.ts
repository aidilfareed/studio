'use server';

import { ai } from '@/ai/genkit';
import { ChatInputSchema, type ChatMessage } from '@/types/chat';
import { z } from 'zod';

// Client-exposed entry point
export async function chat(history: ChatMessage[]): Promise<string> {
  const result = await chatFlow(history);
  return result;
}

// Genkit AI flow
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

    // Call the Genkit AI generation function
    const response = await ai.generate({
      system: systemPrompt,
      messages: history,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
