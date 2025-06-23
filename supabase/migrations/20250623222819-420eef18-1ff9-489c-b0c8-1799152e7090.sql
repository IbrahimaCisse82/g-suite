
-- Disable RLS temporarily for companies table to allow company registration
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;

-- Or alternatively, create a policy that allows anyone to insert companies
-- (since this is for company registration, not user-specific data)
-- ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow company registration" ON companies FOR INSERT TO anon WITH CHECK (true);
