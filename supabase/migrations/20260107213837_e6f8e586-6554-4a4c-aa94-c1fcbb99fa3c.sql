-- Create waitlist_signups table
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist signup)
CREATE POLICY "Anyone can sign up for waitlist" 
ON public.waitlist_signups 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading for authenticated admins (optional, can be adjusted later)
CREATE POLICY "Signups are not publicly readable" 
ON public.waitlist_signups 
FOR SELECT 
USING (false);