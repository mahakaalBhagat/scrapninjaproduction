-- ============================================================
-- SCRAP ITEMS SCHEMA FOR POSTGRESQL
-- ============================================================

-- Create schema
CREATE SCHEMA IF NOT EXISTS scrap_items;

-- Categories Table
CREATE TABLE IF NOT EXISTS scrap_items.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    emoji VARCHAR(10),
    icon_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items Table
CREATE TABLE IF NOT EXISTS scrap_items.items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES scrap_items.categories(id),
    description TEXT,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    emoji VARCHAR(10),
    is_recyclable BOOLEAN DEFAULT TRUE,
    environmental_warning TEXT,
    badge VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Listings Table (what users want to sell)
CREATE TABLE IF NOT EXISTS scrap_items.user_listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER NOT NULL REFERENCES scrap_items.items(id),
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    status VARCHAR(50) DEFAULT 'AVAILABLE',
    description TEXT,
    images TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS scrap_items.transactions (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER,
    buyer_id INTEGER,
    listing_id INTEGER REFERENCES scrap_items.user_listings(id),
    item_id INTEGER REFERENCES scrap_items.items(id),
    quantity DECIMAL(10, 2) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_date TIMESTAMP,
    notes TEXT,
    rating INTEGER,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_items_category ON scrap_items.items(category_id);
CREATE INDEX idx_items_active ON scrap_items.items(is_active);
CREATE INDEX idx_listings_user ON scrap_items.user_listings(user_id);
CREATE INDEX idx_listings_status ON scrap_items.user_listings(status);
CREATE INDEX idx_transactions_seller ON scrap_items.transactions(seller_id);

-- ============================================================
-- INSERT CATEGORIES
-- ============================================================

INSERT INTO scrap_items.categories (name, description, emoji) VALUES
('Paper', 'Newspapers, books, cardboard, office paper', '📰'),
('Plastic', 'PET bottles, containers, buckets, packaging', '🧴'),
('Metals', 'Iron, steel, copper, aluminum, brass', '⚙️'),
('E-Waste', 'Electronics - phones, laptops, monitors', '💻'),
('Appliances', 'Household appliances - AC, fridge, washing machine', '🌬️'),
('Glass', 'Glass bottles, jars, window glass', '🍾'),
('Batteries', 'Car, UPS, and lithium batteries', '🔋'),
('Vehicles', 'Cars, bikes, scooters, bicycles for scrap', '🚗');

-- ============================================================
-- INSERT SCRAP ITEMS (43 items across 8 categories)
-- ============================================================

-- E-Waste Items (10 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Mobile Phone', 4, 'Old smartphones and mobile devices', 6.25, 'piece', '📱', 'If not recycled, valuable metals like gold, silver and copper are permanently lost.', '⚠️ E-Waste'),
('Laptop', 4, 'Old laptop computers', 18.75, 'piece', '💻', 'If not recycled, hazardous chemicals may leak into the environment.', '⚠️ E-Waste'),
('Television', 4, 'LCD/LED/Plasma TVs', 25.00, 'piece', '📺', 'If not recycled, toxic materials can contaminate soil and water.', '⚠️ E-Waste'),
('Desktop CPU', 4, 'Desktop computer towers and CPUs', 22.50, 'piece', '🖥️', 'If not recycled, reusable metals end up in landfills.', '⚠️ E-Waste'),
('Printer', 4, 'Old printers and scanners', 5.00, 'piece', '🖨️', 'If not recycled, plastic and electronic waste accumulates.', '⚠️ E-Waste'),
('Keyboard', 4, 'Computer keyboards and input devices', 1.88, 'piece', '⌨️', 'If not recycled, plastic waste remains for hundreds of years.', '⚠️ E-Waste'),
('Mouse', 4, 'Computer mice and pointing devices', 0.62, 'piece', '🖱️', 'If not recycled, electronic components increase landfill waste.', '⚠️ E-Waste'),
('Router', 4, 'WiFi routers and networking equipment', 3.75, 'piece', '📡', 'If not recycled, valuable circuit materials are lost.', '⚠️ E-Waste'),
('Monitor', 4, 'Computer monitors and displays', 7.50, 'piece', '🖥️', 'If not recycled, toxic elements may pollute groundwater.', '⚠️ E-Waste'),
('Camera', 4, 'Old digital cameras and photography equipment', 10.00, 'piece', '📷', 'If not recycled, batteries and metals become hazardous waste.', '⚠️ E-Waste');

-- Appliances Items (8 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Air Conditioner', 5, 'Old air conditioning units and AC systems', 31.25, 'piece', '❄️', 'If not recycled, refrigerant gases can damage the environment.', '♻️ Recyclable'),
('Refrigerator', 5, 'Old refrigerators and freezers', 37.50, 'piece', '🧊', 'If not recycled, harmful cooling gases contribute to global warming.', '♻️ Recyclable'),
('Washing Machine', 5, 'Old washing machines and dryers', 35.00, 'piece', '🧺', 'If not recycled, reusable steel and copper are wasted.', '♻️ Recyclable'),
('Microwave', 5, 'Old microwave ovens', 10.00, 'piece', '🍽️', 'If not recycled, electronic waste increases pollution.', '♻️ Recyclable'),
('Water Heater', 5, 'Old water heaters and geysers', 15.00, 'piece', '🚿', 'If not recycled, metals and insulation materials are lost.', '♻️ Recyclable'),
('Fan', 5, 'Electric fans and cooling devices', 3.75, 'piece', '🌀', 'If not recycled, plastics and copper are wasted.', '♻️ Recyclable'),
('Mixer Grinder', 5, 'Old mixer grinders and kitchen appliances', 5.00, 'piece', '🥤', 'If not recycled, motors and metals become landfill waste.', '♻️ Recyclable'),
('Iron', 5, 'Electric irons and pressing equipment', 2.50, 'piece', '🔌', 'If not recycled, metal components are permanently discarded.', '♻️ Recyclable');

-- Metals Items (5 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Iron Scrap', 3, 'Iron and iron-based metal scraps', 0.25, 'kg', '🔩', 'If not recycled, mining demand increases unnecessarily.', '♻️ Recyclable'),
('Steel Scrap', 3, 'Steel and stainless steel scraps', 0.31, 'kg', '🏗️', 'If not recycled, valuable resources are wasted.', '♻️ Recyclable'),
('Copper Scrap', 3, 'Copper wires, pipes, and copper scrap', 4.38, 'kg', '🟤', 'If not recycled, natural reserves are depleted faster.', '💰 High Value'),
('Aluminium Scrap', 3, 'Aluminum cans, foil, and aluminum scraps', 1.00, 'kg', '⚙️', 'If not recycled, energy consumption rises significantly.', '♻️ Recyclable'),
('Brass Scrap', 3, 'Brass fittings, fixtures, and brass items', 2.25, 'kg', '🟡', 'If not recycled, reusable materials are lost forever.', '📊 Premium');

-- Paper Items (5 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Newspapers', 1, 'Old newspapers and printed newspapers', 0.06, 'kg', '📰', 'If not recycled, more trees must be cut down.', '♻️ Recyclable'),
('Books', 1, 'Old books and hardcover books', 0.10, 'kg', '📚', 'If not recycled, paper waste accumulates rapidly.', '♻️ Recyclable'),
('Office Paper', 1, 'Used office paper and white paper', 0.08, 'kg', '📄', 'If not recycled, forests are unnecessarily depleted.', '♻️ Recyclable'),
('Cardboard', 1, 'Corrugated cardboard and cardboard boxes', 0.10, 'kg', '📦', 'If not recycled, landfill volume increases.', '♻️ Recyclable'),
('Magazines', 1, 'Old magazines and journals', 0.05, 'kg', '📘', 'If not recycled, natural resources are wasted.', '♻️ Recyclable');

-- Plastic Items (5 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('PET Bottles', 2, 'PET plastic bottles and drink containers', 0.19, 'kg', '🧴', 'If not recycled, plastic may remain for hundreds of years.', '♻️ Recyclable'),
('Plastic Containers', 2, 'Food containers, lunch boxes, and storage', 0.15, 'kg', '🥡', 'If not recycled, oceans and waterways are polluted.', '♻️ Recyclable'),
('Buckets', 2, 'Plastic buckets and large plastic containers', 0.12, 'kg', '🪣', 'If not recycled, plastic waste accumulates.', '♻️ Recyclable'),
('Plastic Chairs', 2, 'Plastic furniture and plastic chairs', 2.50, 'piece', '🪑', 'If not recycled, reusable plastic is lost.', '♻️ Recyclable'),
('Packaging Plastic', 2, 'Plastic packaging and plastic films', 0.10, 'kg', '📦', 'If not recycled, microplastic pollution increases.', '♻️ Recyclable');

-- Glass Items (3 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Glass Bottles', 6, 'Glass bottles and beverage containers', 0.06, 'kg', '🍾', 'If not recycled, glass remains in landfills indefinitely.', '♻️ Recyclable'),
('Glass Jars', 6, 'Glass jars and glass containers', 0.08, 'kg', '🫙', 'If not recycled, reusable material is wasted.', '♻️ Recyclable'),
('Window Glass', 6, 'Window panes and flat glass sheets', 0.12, 'kg', '🪟', 'If not recycled, energy consumption increases.', '♻️ Recyclable');

-- Batteries Items (3 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Car Battery', 7, 'Lead-acid car batteries', 12.50, 'piece', '🔋', 'If not recycled, toxic chemicals can pollute groundwater.', '⚠️ Hazardous'),
('UPS Battery', 7, 'UPS and inverter batteries', 6.25, 'piece', '🔋', 'If not recycled, lead contamination can occur.', '⚠️ Hazardous'),
('Lithium Battery', 7, 'Lithium-ion batteries from devices', 10.00, 'piece', '🔋', 'If not recycled, fire hazards and pollution increase.', '⚠️ Hazardous');

-- Vehicles Items (4 items) - Prices in USD
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Bicycle', 8, 'Old bicycles and bikes for scrap', 3.75, 'piece', '🚲', 'If not recycled, reusable metals are wasted.', '♻️ Recyclable'),
('Motorcycle', 8, 'Old motorcycles and scooters', 62.50, 'piece', '🏍️', 'If not recycled, oils and fluids can contaminate soil.', '⚠️ Hazardous'),
('Car', 8, 'Scrapped automobiles and vehicles', 187.50, 'piece', '🚗', 'If not recycled, metals and components are permanently lost.', '♻️ Recyclable'),
('Scooter', 8, 'Old electric and petrol scooters', 37.50, 'piece', '🛵', 'If not recycled, hazardous fluids may pollute the environment.', '⚠️ Hazardous');

-- ============================================================
-- VERIFY DATA
-- ============================================================

SELECT 'Categories created:' as status, COUNT(*) as count FROM scrap_items.categories;
SELECT 'Items created:' as status, COUNT(*) as count FROM scrap_items.items;
SELECT 'Total items by category:' as status, category_id, COUNT(*) as item_count FROM scrap_items.items GROUP BY category_id ORDER BY category_id;
