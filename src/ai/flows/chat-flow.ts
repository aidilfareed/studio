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

    // Combine system message with chat history
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history,
    ];

    // (Optional) Validate content types
    for (const m of messages) {
      if (typeof m.content !== 'string') {
        console.warn('Invalid content type:', m.content);
        m.content = JSON.stringify(m.content); // fallback to safe string
      }
    }

    // Call the Genkit AI generation function
    const response = await ai.generate({
      messages,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
