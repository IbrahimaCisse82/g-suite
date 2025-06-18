
-- Insérer des contacts de test pour démonstration
INSERT INTO public.contacts (company_id, name, type, email, phone, address, city, country, contact_number) VALUES
-- Récupérer le company_id de la première entreprise disponible et ajouter des clients
((SELECT id FROM public.companies LIMIT 1), 'SARL TERANGA SOLUTIONS', 'client', 'contact@teranga-solutions.sn', '+221 33 123 45 67', '15 Avenue Bourguiba', 'Dakar', 'Sénégal', 'C000001'),
((SELECT id FROM public.companies LIMIT 1), 'ETS BAOBAB TRADING', 'client', 'info@baobab-trading.sn', '+221 77 234 56 78', 'Zone Industrielle de Mbao', 'Pikine', 'Sénégal', 'C000002'),
((SELECT id FROM public.companies LIMIT 1), 'GIE SENEGAL DIGITAL', 'client', 'admin@senegal-digital.com', '+221 70 345 67 89', 'Sicap Liberté 6', 'Dakar', 'Sénégal', 'C000003'),
((SELECT id FROM public.companies LIMIT 1), 'SA OUEST AFRICAINE IMPORT', 'fournisseur', 'commercial@ouestafricaine.sn', '+221 33 456 78 90', 'Km 3,5 Boulevard du Centenaire', 'Dakar', 'Sénégal', 'F000001'),
((SELECT id FROM public.companies LIMIT 1), 'SARL LOGISTICS PLUS', 'fournisseur', 'service@logistics-plus.sn', '+221 76 567 89 01', 'Zone Franche de Dakar', 'Dakar', 'Sénégal', 'F000002'),
((SELECT id FROM public.companies LIMIT 1), 'ETS SAHEL DISTRIBUTION', 'fournisseur', 'contact@sahel-distrib.sn', '+221 78 678 90 12', 'Marché Central', 'Kaolack', 'Sénégal', 'F000003'),
((SELECT id FROM public.companies LIMIT 1), 'AFRICA TECH SERVICES', 'client', 'hello@africatech.sn', '+221 77 789 01 23', 'Plateau, Rue 6', 'Dakar', 'Sénégal', 'C000004'),
((SELECT id FROM public.companies LIMIT 1), 'COMPAGNIE SENEGALAISE ENERGIE', 'fournisseur', 'achat@cse-energie.sn', '+221 33 890 12 34', 'Avenue Cheikh Anta Diop', 'Dakar', 'Sénégal', 'F000004');
