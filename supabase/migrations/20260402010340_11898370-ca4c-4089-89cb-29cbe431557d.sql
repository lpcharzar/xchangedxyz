-- Drop overly permissive insert policy
DROP POLICY IF EXISTS "Anyone can insert swaps" ON public.swaps;

-- Create a stricter insert policy for authenticated users only
CREATE POLICY "Authenticated users can insert swaps"
ON public.swaps
FOR INSERT
TO authenticated
WITH CHECK (true);