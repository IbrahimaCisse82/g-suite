
-- Create storage bucket for company logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('company-logos', 'company-logos', true);

-- Set up RLS policies for the bucket
CREATE POLICY "Allow public uploads to company-logos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'company-logos');

CREATE POLICY "Allow public read access to company-logos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'company-logos');

CREATE POLICY "Allow public updates to company-logos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'company-logos');

CREATE POLICY "Allow public deletes from company-logos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'company-logos');
