-- Create providers table
CREATE TABLE public.providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  equipment_types TEXT[] NOT NULL DEFAULT '{}',
  contact_phone TEXT,
  contact_email TEXT,
  business_address TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own provider requests"
  ON public.providers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own provider requests"
  ON public.providers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own provider requests"
  ON public.providers
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all provider requests"
  ON public.providers
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update provider requests"
  ON public.providers
  FOR UPDATE
  USING (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();