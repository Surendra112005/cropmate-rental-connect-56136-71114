-- Refresh database types by ensuring tables are properly defined
-- This migration will trigger type regeneration

-- Add a comment to profiles table to trigger type refresh
COMMENT ON TABLE profiles IS 'User profile information';

-- Add a comment to rental_requests table
COMMENT ON TABLE rental_requests IS 'Equipment rental requests from users';

-- Add a comment to equipment table
COMMENT ON TABLE equipment IS 'Available equipment for rental';