
'use server';
/**
 * @fileOverview An AI flow for generating a simple MVP roadmap.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const UserStorySchema = z.object({
  role: z.string().describe("The user role, e.g., 'user', 'admin'"),
  action: z.string().describe("The action the user wants to take."),
  benefit: z.string().describe("The benefit the user gains from this action."),
});

const TechStackSchema = z.object({
  category: z.string().describe("The category of the technology, e.g., 'Frontend', 'Backend', 'Database'"),
  technology: z.string().describe("The name of the technology, e.g., 'Next.js', 'Supabase'"),
  reason: z.string().describe("A brief reason for choosing this technology."),
});

const DatabaseTableSchema = z.object({
    name: z.string().describe("The name of the database table, e.g., 'users'"),
    columns: z.array(z.string()).describe("A list of columns for the table, e.g., ['id', 'email', 'created_at']"),
    description: z.string().describe("A brief description of what this table stores."),
});

const RoadmapSchema = z.object({
  userStories: z.array(UserStorySchema).describe("A list of 3-5 core user stories in the format 'As a [role], I can [action], so that [benefit]'."),
  techStack: z.array(TechStackSchema).describe("A list of suggested technologies for the MVP."),
  databaseSchema: z.array(DatabaseTableSchema).describe("A list of basic database tables and their columns."),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

export async function generateRoadmap(description: string): Promise<Roadmap> {
  return roadmapGeneratorFlow(description);
}

const roadmapGeneratorFlow = ai.defineFlow(
  {
    name: 'roadmapGeneratorFlow',
    inputSchema: z.string(),
    outputSchema: RoadmapSchema,
  },
  async (description) => {
    const prompt = `You are an expert software architect and product manager, specializing in creating lean, effective plans for MVPs (Minimum Viable Products).
    
    A user has provided the following description for their app idea: "${description}"

    Based on this idea, generate a simple but practical roadmap. The user is learning to build apps with Next.js, React, TailwindCSS, and Supabase for the database. Your suggestions should align with this stack.

    Please provide the following:
    1.  A list of 3-5 essential user stories.
    2.  A recommended tech stack (limited to Frontend, Backend, Database).
    3.  A simple database schema with 2-3 core tables.`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      output: {
        schema: RoadmapSchema,
      },
      config: {
        temperature: 0.7,
      },
    });

    return llmResponse.output!;
  }
);
