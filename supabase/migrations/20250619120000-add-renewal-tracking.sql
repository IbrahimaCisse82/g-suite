
-- Add column to track when renewal request was sent
ALTER TABLE company_subscriptions 
ADD COLUMN IF NOT EXISTS renewal_request_sent TIMESTAMP WITH TIME ZONE;

-- Add index for better performance when querying expiring subscriptions
CREATE INDEX IF NOT EXISTS idx_company_subscriptions_expiry 
ON company_subscriptions(end_date, is_active, renewal_request_sent);
