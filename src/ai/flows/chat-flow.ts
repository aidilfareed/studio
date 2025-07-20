
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
  async (historyRaw) => {
    const parseResult = ChatInputSchema.safeParse(historyRaw);
    if (!parseResult.success) {
      console.error('Invalid ChatMessage input:', parseResult.error);
      throw new Error('Invalid chat message format');
    }

    const history = parseResult.data;

    const systemPrompt = `You are a helpful assistant for a company called Project Forge.
Project Forge is a coding course that teaches users to build and ship an MVP in 30 days.
Keep your answers concise and helpful.`;
    
    const messages = history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const response = await ai.generate({
      system: systemPrompt,
      messages: messages,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
