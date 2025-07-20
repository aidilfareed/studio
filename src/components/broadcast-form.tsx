
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { sendBroadcast } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const BroadcastSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof BroadcastSchema>;

export function BroadcastForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(sendBroadcast, { message: "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(BroadcastSchema),
    defaultValues: {
      message: "",
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
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset();
      }
    }
  }, [state, toast, form]);

  const onSubmit = (data: FormData) => {
    startTransition(() => {
        const formData = new FormData();
        formData.append('message', data.message);
        formAction(formData);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Announce a new feature or course update..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
              Sending...
            </>
          ) : (
            <>
                <Send className="mr-2"/>
                Send Broadcast
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
