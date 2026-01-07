-- Add format column to track product attribution
ALTER TABLE public.waitlist_signups 
ADD COLUMN format text;