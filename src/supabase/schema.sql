-- Create the interest_submissions table
CREATE TABLE
  public.interest_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subscribed_to_updates BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT interest_submissions_pkey PRIMARY KEY (id),
    CONSTRAINT interest_submissions_email_key UNIQUE (email)
  );

-- Add comments to the table and columns
COMMENT ON TABLE public.interest_submissions IS 'Collects interest submissions from potential users.';
COMMENT ON COLUMN public.interest_submissions.id IS 'Unique identifier for each submission.';
COMMENT ON COLUMN public.interest_submissions.name IS 'The name of the person submitting their interest.';
COMMENT ON COLUMN public.interest_submissions.email IS 'The email address of the person, used for contact.';
COMMENT ON COLUMN public.interest_submissions.subscribed_to_updates IS 'Indicates if the user opted into receiving updates.';
COMMENT ON COLUMN public.interest_submissions.created_at IS 'The timestamp when the submission was created.';
COMMENT ON COLUMN public.interest_submissions.updated_at IS 'The timestamp when the submission was last updated.';

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at () RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at timestamp on row modification
CREATE TRIGGER
  on_update_interest_submissions BEFORE UPDATE
  ON public.interest_submissions FOR EACH ROW
EXECUTE
  PROCEDURE public.handle_updated_at ();

-- Add indexes for performance
CREATE INDEX idx_interest_submissions_email ON public.interest_submissions (email);
CREATE INDEX idx_interest_submissions_created_at ON public.interest_submissions (created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.interest_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- 1. Allow public read access to all rows.
CREATE POLICY "Allow public read access" ON public.interest_submissions FOR
SELECT
  USING (TRUE);

-- 2. Allow public insert access for new submissions.
CREATE POLICY "Allow public insert access" ON public.interest_submissions FOR INSERT
WITH
  CHECK (TRUE);
