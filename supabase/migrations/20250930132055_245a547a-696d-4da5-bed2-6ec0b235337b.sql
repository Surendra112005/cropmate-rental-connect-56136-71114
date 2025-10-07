-- Create equipment table to store equipment details
CREATE TABLE public.equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  available_slots INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- Create policies for equipment (public read, admin write)
CREATE POLICY "Anyone can view equipment" 
ON public.equipment 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert equipment" 
ON public.equipment 
FOR INSERT 
WITH CHECK ((SELECT email FROM public.profiles WHERE user_id = auth.uid()) = 'admin@example.com');

CREATE POLICY "Admins can update equipment" 
ON public.equipment 
FOR UPDATE 
USING ((SELECT email FROM public.profiles WHERE user_id = auth.uid()) = 'admin@example.com');

-- Create rental_requests table
CREATE TABLE public.rental_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  equipment_name TEXT NOT NULL,
  equipment_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  response_date TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for rental requests
CREATE POLICY "Users can view their own rental requests" 
ON public.rental_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all rental requests" 
ON public.rental_requests 
FOR SELECT 
USING ((SELECT email FROM public.profiles WHERE user_id = auth.uid()) = 'admin@example.com');

CREATE POLICY "Users can create their own rental requests" 
ON public.rental_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update rental requests" 
ON public.rental_requests 
FOR UPDATE 
USING ((SELECT email FROM public.profiles WHERE user_id = auth.uid()) = 'admin@example.com');

-- Create trigger for automatic timestamp updates on equipment
CREATE TRIGGER update_equipment_updated_at
BEFORE UPDATE ON public.equipment
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on rental_requests
CREATE TRIGGER update_rental_requests_updated_at
BEFORE UPDATE ON public.rental_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();