'use server';

import { ai } from '@/ai/genkit';
import { ChatInputSchema, type ChatMessage } from '@/types/chat';
import { z } from 'zod';

export async function chat(history: ChatMessage[]): Promise<string> {
  return await chatFlow(history);
}

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

    // (Optional) Validate content types - This is for safety, though schema should enforce it
    for (const m of history) {
      if (typeof m.content !== 'string') {
        console.warn('Invalid content type:', m.content);
        m.content = JSON.stringify(m.content); // fallback to safe string
      }
    }

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
