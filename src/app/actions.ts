
'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subscribed_to_updates: z.boolean().default(false),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subscribed_to_updates?: string[];
  };
};

export async function submitInterest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // ✅ Fix: Ensure checkbox is correctly parsed as boolean
  const subscribed = formData.get('subscribed_to_updates') === 'on';

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subscribed_to_updates: subscribed,
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subscribed_to_updates } = validatedFields.data;

  try {
    // ✅ Check for existing email in DB
    const { data: existingSubmission, error: selectError } = await supabase
      .from('interest_submissions')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (selectError) {
      throw new Error('Database error checking for existing email.');
    }

    if (existingSubmission) {
      return {
        message: 'This email has already been submitted.',
        errors: {
          email: ['This email is already on our list. Thank you!'],
        },
      };
    }

    // ✅ Insert data with correct boolean field
    const { error: insertError } = await supabase
      .from('interest_submissions')
      .insert({
        name,
        email,
        subscribed_to_updates,
      });

    if (insertError) {
      throw new Error('Failed to save your submission.');
    }

    revalidatePath('/');
    return { message: 'Thank you for your interest!' };

  } catch (error) {
    return { message: getErrorMessage(error) };
  }
}

export async function getSubmissionCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('interest_submissions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Database Error:', error.message);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error('Failed to fetch submission count:', getErrorMessage(error));
    return 0;
  }
}

export async function updateSubscription(
  email: string,
  subscribed: boolean
): Promise<FormState> {
  try {
    const { error } = await supabase
      .from('interest_submissions')
      .update({ subscribed_to_updates: subscribed })
      .eq('email', email);

    if (error) {
      throw new Error('Failed to update subscription status');
    }

    revalidatePath('/');
    return {
      message: subscribed
        ? 'You are now subscribed to updates'
        : 'You have been unsubscribed',
    };
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
}
