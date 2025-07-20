
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateRoadmap, type Roadmap } from '@/ai/flows/roadmap-generator-flow';
import { Loader2, Zap, Rocket, Database, Users } from 'lucide-react';

const FormSchema = z.object({
  description: z.string().min(10, { message: 'Please describe your idea in at least 10 characters.' }),
});

type FormData = z.infer<typeof FormSchema>;

export function RoadmapGenerator() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setRoadmap(null);
    try {
      const result = await generateRoadmap(data.description);
      setRoadmap(result);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      // You could add a toast notification here to inform the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Describe Your App Idea</CardTitle>
          <CardDescription>What does your app do? Who is it for? Be as descriptive as you like.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">App Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A social media app for gardeners to share pictures of their plants and get advice." {...field} rows={4}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Roadmap
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
            <p className="text-muted-foreground mt-2">Our AI architect is drafting your plan...</p>
        </div>
      )}

      {roadmap && (
        <div className="mt-8 space-y-8">
            <h2 className="text-3xl font-bold text-center">Your MVP Roadmap</h2>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="text-primary"/>User Stories</CardTitle>
                    <CardDescription>These are the core interactions that define your app.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {roadmap.userStories.map((story, index) => (
                       <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                           <p className="font-medium text-secondary-foreground">As a <span className="text-primary">{story.role}</span>, I can <span className="text-primary">{story.action}</span>, so that <span className="text-primary">{story.benefit}</span>.</p>
                       </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Rocket className="text-primary"/>Tech Stack</CardTitle>
                        <CardDescription>The technology foundation for your app.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {roadmap.techStack.map((tech, index) => (
                            <div key={index}>
                                <h4 className="font-semibold">{tech.technology} <span className="text-sm font-normal text-muted-foreground">({tech.category})</span></h4>
                                <p className="text-sm text-muted-foreground">{tech.reason}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Database className="text-primary"/>Database Schema</CardTitle>
                        <CardDescription>A starting point for your data structure.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {roadmap.databaseSchema.map((table, index) => (
                           <div key={index}>
                                <h4 className="font-semibold">{table.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{table.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {table.columns.map(col => <span key={col} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">{col}</span>)}
                                </div>
                           </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
