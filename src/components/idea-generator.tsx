
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateIdeas, type Idea } from '@/ai/flows/idea-generator-flow';
import { Loader2, Lightbulb, Zap } from 'lucide-react';

const FormSchema = z.object({
  topic: z.string().min(2, { message: 'Please enter a topic.' }),
});

type FormData = z.infer<typeof FormSchema>;

export function IdeaGenerator() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateIdeas(data.topic);
      setIdeas(result.ideas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      // You could add a toast notification here to inform the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>What are you passionate about?</CardTitle>
          <CardDescription>Enter a topic, industry, or hobby to generate MVP ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="sr-only">Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fitness, SaaS, Pet Care..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="mt-0">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground mt-2">Our AI is brainstorming...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Here are a few ideas!</h2>
          {ideas.map((idea, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    {idea.name}
                </CardTitle>
                <CardDescription>{idea.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {idea.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
