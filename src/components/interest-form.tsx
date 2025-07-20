
"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";

import { submitInterest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PartyPopper } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subscribed_to_updates: z.boolean().default(false).optional(),
});

type FormData = z.infer<typeof FormSchema>;

export function InterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitInterest, { message: "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      subscribed_to_updates: true,
    },
    context: state,
  });

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        setSubmitted(true);
      }
    }
  }, [state, toast]);

  const handleReset = () => {
    form.reset();
    setSubmitted(false);
  };
  
  const onSubmit = (data: FormData) => {
    startTransition(() => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.subscribed_to_updates) {
            formData.append('subscribed_to_updates', 'on');
        }
        formAction(formData);
    });
  }

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div>
          <PartyPopper className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="text-lg font-semibold">Welcome Aboard!</h3>
          <p className="text-muted-foreground mt-2">
            Thank you for joining the waitlist. We'll be in touch soon!
          </p>
        </div>
        <Button onClick={handleReset} variant="outline">
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ada Lovelace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="ada.lovelace@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscribed_to_updates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Receive updates about new features and releases.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </Button>
      </form>
    </Form>
  );
}
