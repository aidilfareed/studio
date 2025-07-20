-- Create the interest_submissions table
CREATE TABLE public.interest_submissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    subscribed_to_updates boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.interest_submissions OWNER TO postgres;

-- Add primary key constraint
ALTER TABLE ONLY public.interest_submissions
    ADD CONSTRAINT interest_submissions_pkey PRIMARY KEY (id);

-- Add unique constraint for email
ALTER TABLE ONLY public.interest_submissions
    ADD CONSTRAINT interest_submissions_email_key UNIQUE (email);

-- Create indexes for performance
CREATE INDEX idx_interest_submissions_email ON public.interest_submissions USING btree (email);
CREATE INDEX idx_interest_submissions_created_at ON public.interest_submissions USING btree (created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.interest_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow public read access
CREATE POLICY "Allow public read-only access" ON public.interest_submissions
    FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" ON public.interest_submissions
    FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row modification
CREATE TRIGGER on_updated_at
BEFORE UPDATE ON public.interest_submissions
FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_at();
