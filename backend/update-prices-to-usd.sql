-- ============================================================
-- UPDATE EXISTING SCRAP ITEMS PRICES TO USD
-- ============================================================
-- This script updates all existing items in the database from INR to USD
-- Run this AFTER the database schema has been created but BEFORE running the app

-- UPDATE E-Waste Items (10 items)
UPDATE scrap_items.items SET price_per_unit = 6.25 WHERE name = 'Mobile Phone';
UPDATE scrap_items.items SET price_per_unit = 18.75 WHERE name = 'Laptop';
UPDATE scrap_items.items SET price_per_unit = 25.00 WHERE name = 'Television';
UPDATE scrap_items.items SET price_per_unit = 22.50 WHERE name = 'Desktop CPU';
UPDATE scrap_items.items SET price_per_unit = 5.00 WHERE name = 'Printer';
UPDATE scrap_items.items SET price_per_unit = 1.88 WHERE name = 'Keyboard';
UPDATE scrap_items.items SET price_per_unit = 0.62 WHERE name = 'Mouse';
UPDATE scrap_items.items SET price_per_unit = 3.75 WHERE name = 'Router';
UPDATE scrap_items.items SET price_per_unit = 7.50 WHERE name = 'Monitor';
UPDATE scrap_items.items SET price_per_unit = 10.00 WHERE name = 'Camera';

-- UPDATE Appliances Items (8 items)
UPDATE scrap_items.items SET price_per_unit = 31.25 WHERE name = 'Air Conditioner';
UPDATE scrap_items.items SET price_per_unit = 37.50 WHERE name = 'Refrigerator';
UPDATE scrap_items.items SET price_per_unit = 35.00 WHERE name = 'Washing Machine';
UPDATE scrap_items.items SET price_per_unit = 10.00 WHERE name = 'Microwave';
UPDATE scrap_items.items SET price_per_unit = 15.00 WHERE name = 'Water Heater';
UPDATE scrap_items.items SET price_per_unit = 3.75 WHERE name = 'Fan';
UPDATE scrap_items.items SET price_per_unit = 5.00 WHERE name = 'Mixer Grinder';
UPDATE scrap_items.items SET price_per_unit = 2.50 WHERE name = 'Iron';

-- UPDATE Metals Items (5 items)
UPDATE scrap_items.items SET price_per_unit = 0.25 WHERE name = 'Iron Scrap';
UPDATE scrap_items.items SET price_per_unit = 0.31 WHERE name = 'Steel Scrap';
UPDATE scrap_items.items SET price_per_unit = 4.38 WHERE name = 'Copper Scrap';
UPDATE scrap_items.items SET price_per_unit = 1.00 WHERE name = 'Aluminium Scrap';
UPDATE scrap_items.items SET price_per_unit = 2.25 WHERE name = 'Brass Scrap';

-- UPDATE Paper Items (5 items)
UPDATE scrap_items.items SET price_per_unit = 0.06 WHERE name = 'Newspapers';
UPDATE scrap_items.items SET price_per_unit = 0.10 WHERE name = 'Books';
UPDATE scrap_items.items SET price_per_unit = 0.08 WHERE name = 'Office Paper';
UPDATE scrap_items.items SET price_per_unit = 0.10 WHERE name = 'Cardboard';
UPDATE scrap_items.items SET price_per_unit = 0.05 WHERE name = 'Magazines';

-- UPDATE Plastic Items (5 items)
UPDATE scrap_items.items SET price_per_unit = 0.19 WHERE name = 'PET Bottles';
UPDATE scrap_items.items SET price_per_unit = 0.15 WHERE name = 'Plastic Containers';
UPDATE scrap_items.items SET price_per_unit = 0.12 WHERE name = 'Buckets';
UPDATE scrap_items.items SET price_per_unit = 2.50 WHERE name = 'Plastic Chairs';
UPDATE scrap_items.items SET price_per_unit = 0.10 WHERE name = 'Packaging Plastic';

-- UPDATE Glass Items (3 items)
UPDATE scrap_items.items SET price_per_unit = 0.06 WHERE name = 'Glass Bottles';
UPDATE scrap_items.items SET price_per_unit = 0.08 WHERE name = 'Glass Jars';
UPDATE scrap_items.items SET price_per_unit = 0.12 WHERE name = 'Window Glass';

-- UPDATE Batteries Items (3 items)
UPDATE scrap_items.items SET price_per_unit = 12.50 WHERE name = 'Car Battery';
UPDATE scrap_items.items SET price_per_unit = 6.25 WHERE name = 'UPS Battery';
UPDATE scrap_items.items SET price_per_unit = 10.00 WHERE name = 'Lithium Battery';

-- UPDATE Vehicles Items (4 items)
UPDATE scrap_items.items SET price_per_unit = 3.75 WHERE name = 'Bicycle';
UPDATE scrap_items.items SET price_per_unit = 62.50 WHERE name = 'Motorcycle';
UPDATE scrap_items.items SET price_per_unit = 187.50 WHERE name = 'Car';
UPDATE scrap_items.items SET price_per_unit = 37.50 WHERE name = 'Scooter';

-- ============================================================
-- VERIFY UPDATES
-- ============================================================

SELECT 'Updated items:' as status, COUNT(*) as count FROM scrap_items.items WHERE price_per_unit > 0;
SELECT 'Items with zero price:' as status, COUNT(*) as count FROM scrap_items.items WHERE price_per_unit = 0;
SELECT 'Sample prices (first 10):' as status;
SELECT name, unit, price_per_unit FROM scrap_items.items ORDER BY id LIMIT 10;
