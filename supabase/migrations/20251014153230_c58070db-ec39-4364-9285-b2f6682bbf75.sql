-- Create a security definer function to check if a user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = is_admin.user_id
    AND profiles.email = 'admin@example.com'
  );
$$;

-- Drop existing admin policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Admins can update rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Admins can insert equipment" ON public.equipment;
DROP POLICY IF EXISTS "Admins can update equipment" ON public.equipment;

-- Recreate policies using the security definer function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all rental requests"
ON public.rental_requests
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update rental requests"
ON public.rental_requests
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert equipment"
ON public.equipment
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update equipment"
ON public.equipment
FOR UPDATE
USING (public.is_admin(auth.uid()));