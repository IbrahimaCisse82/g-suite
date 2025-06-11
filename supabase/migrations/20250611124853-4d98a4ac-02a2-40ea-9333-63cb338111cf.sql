
-- Create enum for business sectors
CREATE TYPE public.business_sector AS ENUM (
  'agriculture',
  'industrie',
  'construction',
  'commerce',
  'transport',
  'hebergement_restauration',
  'information_communication',
  'activites_financieres',
  'immobilier',
  'activites_specialisees',
  'administration_publique',
  'enseignement',
  'sante_action_sociale',
  'arts_spectacles',
  'autres_services'
);

-- Create enum for user invitation status
CREATE TYPE public.invitation_status AS ENUM (
  'pending',
  'accepted',
  'expired',
  'cancelled'
);

-- Add storage bucket for company logos
INSERT INTO storage.buckets (id, name, public) VALUES ('company-logos', 'company-logos', true);

-- Create storage policy for company logos
CREATE POLICY "Anyone can view company logos" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');

CREATE POLICY "Authenticated users can upload company logos" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'company-logos' AND 
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own company logos" ON storage.objects FOR UPDATE USING (
  bucket_id = 'company-logos' AND 
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own company logos" ON storage.objects FOR DELETE USING (
  bucket_id = 'company-logos' AND 
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create companies table with all fields including new ones
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  phone TEXT,
  email TEXT NOT NULL,
  business_sector business_sector NOT NULL,
  representative_first_name TEXT NOT NULL,
  representative_last_name TEXT NOT NULL,
  logo_url TEXT,
  ninea TEXT,
  rccm TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'user',
  is_company_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user invitations table
CREATE TABLE public.user_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  invited_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'user',
  status invitation_status DEFAULT 'pending',
  token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view their own company" 
  ON public.companies 
  FOR SELECT 
  USING (
    id IN (
      SELECT company_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Company admins can update their company" 
  ON public.companies 
  FOR UPDATE 
  USING (
    id IN (
      SELECT company_id FROM public.profiles 
      WHERE id = auth.uid() AND is_company_admin = true
    )
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their company" 
  ON public.profiles 
  FOR SELECT 
  USING (
    company_id IN (
      SELECT company_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (id = auth.uid());

-- RLS Policies for invitations
CREATE POLICY "Company admins can manage invitations" 
  ON public.user_invitations 
  FOR ALL 
  USING (
    company_id IN (
      SELECT company_id FROM public.profiles 
      WHERE id = auth.uid() AND is_company_admin = true
    )
  );

CREATE POLICY "Anyone can view invitations by token" 
  ON public.user_invitations 
  FOR SELECT 
  USING (true);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invitations_updated_at BEFORE UPDATE ON public.user_invitations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_companies_ninea ON public.companies(ninea);
CREATE INDEX idx_companies_rccm ON public.companies(rccm);
CREATE INDEX idx_profiles_company_id ON public.profiles(company_id);
CREATE INDEX idx_invitations_company_id ON public.user_invitations(company_id);
CREATE INDEX idx_invitations_token ON public.user_invitations(token);
CREATE INDEX idx_invitations_status ON public.user_invitations(status);
