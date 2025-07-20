
'use server';
/**
 * @fileOverview An AI flow for generating MVP (Minimum Viable Product) ideas.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdeaSchema = z.object({
  name: z.string().describe('A catchy and descriptive name for the MVP.'),
  description: z.string().describe('A one or two-sentence description of what the product does.'),
  features: z.array(z.string()).describe('A list of 3-5 core features for the MVP.'),
});

const IdeaGeneratorOutputSchema = z.object({
    ideas: z.array(IdeaSchema).describe('A list of 3 unique MVP ideas.'),
});

export type Idea = z.infer<typeof IdeaSchema>;
export type IdeaGeneratorOutput = z.infer<typeof IdeaGeneratorOutputSchema>;

export async function generateIdeas(topic: string): Promise<IdeaGeneratorOutput> {
  return ideaGeneratorFlow(topic);
}

const ideaGeneratorFlow = ai.defineFlow(
  {
    name: 'ideaGeneratorFlow',
    inputSchema: z.string(),
    outputSchema: IdeaGeneratorOutputSchema,
  },
  async (topic) => {
    const prompt = `You are an expert product manager who excels at brainstorming innovative startup ideas.
    Generate 3 unique and compelling MVP (Minimum Viable Product) ideas based on the following topic: "${topic}".
    
    For each idea, provide a name, a short description, and a list of essential features.
    The ideas should be modern, feasible for a small team or solo developer, and have clear potential for monetization or user growth.
    Focus on niches within the topic for more original ideas.`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      output: {
        schema: IdeaGeneratorOutputSchema,
      },
      config: {
        temperature: 0.8,
      },
    });

    return llmResponse.output!;
  }
);
