-- Update the is_admin function to use the new admin email
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = is_admin.user_id
    AND profiles.email = 'admin@cropmate.com'
  );
$$;