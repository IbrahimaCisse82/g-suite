
-- Mettre à jour les limites d'utilisateurs pour les plans existants
UPDATE subscription_plans 
SET max_users = 5 
WHERE name ILIKE '%entreprise%';

UPDATE subscription_plans 
SET max_users = 3 
WHERE name ILIKE '%comptab%';

UPDATE subscription_plans 
SET max_users = 3 
WHERE name ILIKE '%commercial%';

-- Insérer les plans s'ils n'existent pas en utilisant le plan_type 'premium' par défaut
INSERT INTO subscription_plans (name, plan_type, max_users, price, duration_months, currency)
SELECT 'Solution Entreprise', 'premium', 5, 50000, 12, 'XOF'
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Solution Entreprise');

INSERT INTO subscription_plans (name, plan_type, max_users, price, duration_months, currency)
SELECT 'Solution Comptabilité', 'premium', 3, 25000, 12, 'XOF'
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Solution Comptabilité');

INSERT INTO subscription_plans (name, plan_type, max_users, price, duration_months, currency)
SELECT 'Solution Commerciale', 'premium', 3, 30000, 12, 'XOF'
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Solution Commerciale');
