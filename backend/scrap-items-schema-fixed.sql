-- Categories Table (BIGINT instead of SERIAL)
CREATE TABLE scrap_items.categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    emoji VARCHAR(10),
    icon_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items Table
CREATE TABLE scrap_items.items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id BIGINT NOT NULL REFERENCES scrap_items.categories(id),
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

-- User Listings Table
CREATE TABLE scrap_items.user_listings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    item_id BIGINT NOT NULL REFERENCES scrap_items.items(id),
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
CREATE TABLE scrap_items.transactions (
    id BIGSERIAL PRIMARY KEY,
    seller_id BIGINT,
    buyer_id BIGINT,
    listing_id BIGINT REFERENCES scrap_items.user_listings(id),
    quantity DECIMAL(10, 2),
    price DECIMAL(10, 2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_category ON scrap_items.items(category_id);
CREATE INDEX idx_name ON scrap_items.items(name);
CREATE INDEX idx_active ON scrap_items.items(is_active);
CREATE INDEX idx_user ON scrap_items.user_listings(user_id);
CREATE INDEX idx_status ON scrap_items.user_listings(status);
CREATE INDEX idx_created ON scrap_items.user_listings(created_at);

-- ============================================================
-- INSERT CATEGORIES
-- ============================================================

INSERT INTO scrap_items.categories (name, description, emoji, is_active) VALUES
('Paper', 'Paper, cardboard, and paper products', '📄', TRUE),
('Plastic', 'Various types of plastic materials', '♻️', TRUE),
('Metals', 'Metal scraps and metal items', '⚙️', TRUE),
('E-Waste', 'Electronic waste and components', '💻', TRUE),
('Appliances', 'Old household appliances', '🏠', TRUE),
('Glass', 'Glass bottles and glass items', '🔷', TRUE),
('Batteries', 'Used batteries and accumulators', '🔋', TRUE),
('Vehicles', 'Vehicle parts and scrap metals', '🚗', TRUE);

-- ============================================================
-- INSERT ITEMS (43 items across 8 categories)
-- ============================================================

-- Paper (5 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Cardboard Boxes', 1, 'Used cardboard boxes', 2.50, 'kg', '📦', 'Contains adhesive and ink', 'Recyclable'),
('Office Paper', 1, 'Clean white office paper', 3.75, 'kg', '📃', 'May contain staples', 'Premium'),
('Newspaper', 1, 'Old newspapers and magazines', 1.50, 'kg', '📰', 'Ink may stain', 'Standard'),
('Paper Bags', 1, 'Used paper shopping bags', 2.00, 'kg', '🛍️', 'May have handles', 'Standard'),
('Cardboard Tubes', 1, 'Paper towel and toilet paper tubes', 1.25, 'kg', '🔄', 'No hazard', 'Standard');

-- Plastic (5 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('PET Bottles', 2, 'Clear plastic beverage bottles', 2.00, 'kg', '🍾', 'Rinse before recycling', 'Standard'),
('HDPE Containers', 2, 'High-density polyethylene containers', 2.50, 'kg', '📦', 'Clean containers only', 'Standard'),
('PVC Pipes', 2, 'Polyvinyl chloride pipe scraps', 3.00, 'kg', '🔧', 'May contain lead paint', 'Caution'),
('Plastic Films', 2, 'Plastic wrap and film', 1.75, 'kg', '📋', 'Difficult to recycle', 'Standard'),
('Plastic Bags', 2, 'Used plastic shopping bags', 1.50, 'kg', '🛍️', 'Causes tangles in machinery', 'Caution');

-- Metals (5 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Aluminum Cans', 3, 'Used aluminum beverage cans', 12.00, 'kg', '🥫', 'No hazard', 'Premium'),
('Steel Scraps', 3, 'General steel and iron scraps', 5.50, 'kg', '⚙️', 'Sharp edges present', 'Standard'),
('Copper Wire', 3, 'Copper electrical wires', 18.00, 'kg', '🔌', 'May have insulation', 'Premium'),
('Brass Fittings', 3, 'Used brass plumbing fittings', 15.00, 'kg', '🔩', 'No hazard', 'Premium'),
('Stainless Steel', 3, 'Stainless steel scrap items', 14.00, 'kg', '🍴', 'No hazard', 'Premium');

-- E-Waste (10 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Old Smartphones', 4, 'Non-functional or damaged smartphones', 25.00, 'unit', '📱', 'Contains lithium batteries', 'Hazard'),
('Computer Monitors', 4, 'Old CRT and LED monitors', 8.00, 'unit', '🖥️', 'Contains mercury and lead', 'Hazard'),
('Keyboards', 4, 'Used computer keyboards', 3.00, 'unit', '⌨️', 'May contain heavy metals', 'Standard'),
('Computer Fans', 4, 'Used cooling fans and heatsinks', 2.50, 'unit', '🌀', 'Check for hazardous liquids', 'Standard'),
('Motherboards', 4, 'Used computer motherboards', 12.00, 'unit', '🖲️', 'Contains toxic materials', 'Hazard'),
('Power Supplies', 4, 'Old computer power supplies', 7.50, 'unit', '⚡', 'May contain residual charge', 'Caution'),
('RAM Memory', 4, 'Used RAM modules', 5.00, 'unit', '💾', 'Safe to handle', 'Standard'),
('Hard Drives', 4, 'Used HDD/SSD drives', 6.00, 'unit', '💿', 'Data security concern', 'Caution'),
('Cables and Connectors', 4, 'Mixed electronic cables', 2.00, 'kg', '🔌', 'May have insulation', 'Standard'),
('Circuit Boards', 4, 'Used circuit boards and PCBs', 9.00, 'kg', '🔳', 'Contains heavy metals', 'Hazard');

-- Appliances (8 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Old Refrigerators', 5, 'Non-functional refrigerators', 35.00, 'unit', '🧊', 'Contains CFC gases', 'Hazard'),
('Washing Machines', 5, 'Used washing machines', 40.00, 'unit', '🌊', 'Heavy and bulky', 'Standard'),
('Microwave Ovens', 5, 'Old microwave ovens', 8.00, 'unit', '🍳', 'Contains magnetron', 'Caution'),
('Air Conditioners', 5, 'Used AC units', 50.00, 'unit', '❄️', 'Contains refrigerant', 'Hazard'),
('Electric Heaters', 5, 'Used electric heating elements', 12.00, 'unit', '🔥', 'Check for damage', 'Standard'),
('Vacuum Cleaners', 5, 'Old vacuum cleaners', 5.00, 'unit', '🌪️', 'Motor damage possible', 'Standard'),
('Toasters and Kettles', 5, 'Small kitchen appliances', 3.00, 'unit', '⚙️', 'Check for damage', 'Standard'),
('Television Sets', 5, 'Old TV units (CRT/LED)', 15.00, 'unit', '📺', 'Contains lead glass', 'Hazard');

-- Glass (3 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Clear Glass Bottles', 6, 'Used clear glass bottles', 1.50, 'kg', '🍾', 'Breakage risk', 'Standard'),
('Colored Glass', 6, 'Mixed color glass bottles', 1.25, 'kg', '🔷', 'Breakage risk', 'Standard'),
('Glass Jars', 6, 'Glass storage jars', 2.00, 'kg', '🏺', 'Breakage risk', 'Standard');

-- Batteries (3 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Alkaline Batteries', 7, 'Used AA, AAA batteries', 8.00, 'kg', '🔋', 'Contains toxic metals', 'Hazard'),
('Lithium Batteries', 7, 'Used lithium ion batteries', 25.00, 'kg', '🔌', 'Fire hazard', 'Hazard'),
('Lead Acid Batteries', 7, 'Used car batteries', 30.00, 'unit', '🚗', 'Highly toxic', 'Hazard');

-- Vehicles (4 items)
INSERT INTO scrap_items.items (name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
('Car Parts', 8, 'Various used car parts', 15.00, 'kg', '🔧', 'May have oil residue', 'Caution'),
('Scrap Metal from Vehicles', 8, 'Metal scraps from old cars', 8.00, 'kg', '🚗', 'May be contaminated', 'Standard'),
('Tires', 8, 'Old vehicle tires', 5.00, 'unit', '🛞', 'Bulky disposal needed', 'Standard'),
('Engine Blocks', 8, 'Used engine blocks', 45.00, 'unit', '⚙️', 'Very heavy', 'Standard');
