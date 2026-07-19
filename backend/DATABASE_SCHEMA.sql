-- ============================================================
-- SCRAP NINJA DATABASE COMPLETE SCHEMA
-- ============================================================
-- Database: appdb
-- Location: MySQL/PostgreSQL Server
-- User: admin
-- ============================================================

-- ============================================================
-- SCHEMAS (Microservices Namespaces)
-- ============================================================
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS pickup;
CREATE SCHEMA IF NOT EXISTS pricing;
CREATE SCHEMA IF NOT EXISTS location;
CREATE SCHEMA IF NOT EXISTS enquiry;
CREATE SCHEMA IF NOT EXISTS scrap_items;
CREATE SCHEMA IF NOT EXISTS vendor;
CREATE SCHEMA IF NOT EXISTS rider;

-- Grant permissions
GRANT ALL ON SCHEMA auth        TO admin;
GRANT ALL ON SCHEMA pickup      TO admin;
GRANT ALL ON SCHEMA pricing     TO admin;
GRANT ALL ON SCHEMA location    TO admin;
GRANT ALL ON SCHEMA enquiry     TO admin;
GRANT ALL ON SCHEMA scrap_items TO admin;
GRANT ALL ON SCHEMA vendor      TO admin;
GRANT ALL ON SCHEMA rider       TO admin;

-- Allow future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA auth        GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA pickup      GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA pricing     GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA location    GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA enquiry     GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA scrap_items GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA vendor      GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA rider       GRANT ALL ON TABLES TO admin;

-- ============================================================
-- AUTH SCHEMA - User Authentication
-- ============================================================
CREATE TABLE IF NOT EXISTS auth.users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER', 'VENDOR', 'RIDER', 'ADMIN') DEFAULT 'CUSTOMER',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- SCRAP_ITEMS SCHEMA - New Module
-- ============================================================

-- Scrap Categories
CREATE TABLE IF NOT EXISTS scrap_items.categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  icon_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Scrap Items
CREATE TABLE IF NOT EXISTS scrap_items.items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id BIGINT NOT NULL,
  description TEXT,
  price_per_unit DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL COMMENT 'kg, unit, piece, etc.',
  image_url VARCHAR(255),
  emoji VARCHAR(10),
  is_recyclable BOOLEAN DEFAULT TRUE,
  environmental_warning TEXT,
  badge VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES scrap_items.categories(id),
  INDEX idx_category (category_id),
  INDEX idx_name (name),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- User Scrap Listings (what users want to sell)
CREATE TABLE IF NOT EXISTS scrap_items.user_listings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  item_id BIGINT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  status ENUM('AVAILABLE', 'PENDING', 'SOLD', 'CANCELLED') DEFAULT 'AVAILABLE',
  description TEXT,
  images JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  FOREIGN KEY (item_id) REFERENCES scrap_items.items(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Scrap Transactions
CREATE TABLE IF NOT EXISTS scrap_items.transactions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  seller_id BIGINT NOT NULL,
  buyer_id BIGINT,
  listing_id BIGINT NOT NULL,
  item_id BIGINT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('PENDING', 'COMPLETED', 'CANCELLED', 'REJECTED') DEFAULT 'PENDING',
  payment_method VARCHAR(50),
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_date TIMESTAMP NULL,
  notes TEXT,
  rating INT,
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES auth.users(id),
  FOREIGN KEY (buyer_id) REFERENCES auth.users(id),
  FOREIGN KEY (listing_id) REFERENCES scrap_items.user_listings(id),
  FOREIGN KEY (item_id) REFERENCES scrap_items.items(id),
  INDEX idx_seller (seller_id),
  INDEX idx_buyer (buyer_id),
  INDEX idx_status (status),
  INDEX idx_date (transaction_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- VENDOR SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS vendor.vendor_applications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  trade_license_number VARCHAR(100) UNIQUE NOT NULL,
  license_expiry_date DATE NOT NULL,
  business_address TEXT NOT NULL,
  business_type ENUM('MAINLAND', 'FREE_ZONE') NOT NULL,
  
  -- KYC
  passport_number VARCHAR(50),
  emirates_id VARCHAR(50),
  signatory_name VARCHAR(255),
  signatory_designation VARCHAR(100),
  
  -- Banking
  bank_name VARCHAR(255),
  account_holder_name VARCHAR(255),
  iban VARCHAR(50),
  account_number VARCHAR(50),
  
  -- Status
  application_status ENUM('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW') DEFAULT 'PENDING',
  rejection_reason TEXT,
  approved_date TIMESTAMP NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  INDEX idx_status (application_status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- RIDER SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS rider.rider_applications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL,
  emirates_id VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality VARCHAR(100),
  
  -- Vehicle Details
  vehicle_type VARCHAR(100) NOT NULL,
  vehicle_registration VARCHAR(100) UNIQUE NOT NULL,
  vehicle_make VARCHAR(100) NOT NULL,
  vehicle_model VARCHAR(100) NOT NULL,
  vehicle_year INT NOT NULL,
  license_plate VARCHAR(50) UNIQUE NOT NULL,
  
  -- Banking
  bank_name VARCHAR(255),
  account_holder_name VARCHAR(255),
  iban VARCHAR(50),
  account_number VARCHAR(50),
  
  -- Status
  application_status ENUM('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW') DEFAULT 'PENDING',
  rejection_reason TEXT,
  approved_date TIMESTAMP NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  INDEX idx_status (application_status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- PICKUP SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS pickup.pickup_requests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  pickup_address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  preferred_date DATE NOT NULL,
  preferred_time_slot VARCHAR(50) NOT NULL,
  scrap_type VARCHAR(100),
  quantity VARCHAR(100),
  description TEXT,
  status ENUM('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
  rider_id BIGINT,
  assigned_date TIMESTAMP NULL,
  completed_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  FOREIGN KEY (rider_id) REFERENCES auth.users(id),
  INDEX idx_status (status),
  INDEX idx_user (user_id),
  INDEX idx_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- PRICING SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS pricing.price_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  item_id BIGINT NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL,
  effective_date DATE NOT NULL,
  end_date DATE,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES scrap_items.items(id),
  INDEX idx_item (item_id),
  INDEX idx_date (effective_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- LOCATION SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS location.service_areas (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  area_name VARCHAR(255) NOT NULL,
  zone VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  radius_km DECIMAL(5, 2),
  is_serviceable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY idx_area (area_name, zone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- ENQUIRY SCHEMA
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiry.enquiries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(100),
  status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  INDEX idx_status (status),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- INSERT SAMPLE DATA - SCRAP CATEGORIES & ITEMS
-- ============================================================

INSERT IGNORE INTO scrap_items.categories (id, name, description, emoji) VALUES
(1, 'Paper', 'Newspapers, cardboard, magazines, books', '📰'),
(2, 'Plastic', 'Bottles, bags, containers, films', '🍾'),
(3, 'Metals', 'Aluminum, copper, steel, brass', '⚙️'),
(4, 'E-Waste', 'Electronics, appliances, devices', '💻'),
(5, 'Appliances', 'Large appliances for recycling', '🌬️'),
(6, 'Vehicles', 'Cars, bikes, vehicles for scrap', '🚗');

-- Paper Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(1, 'Newspapers', 1, 'Old newspapers and magazines', 5, 'kg', '📰', 'If not recycled, ink chemicals can pollute groundwater.', '♻️ Recyclable'),
(2, 'Cardboard Boxes', 1, 'Used cardboard and corrugated boxes', 8, 'kg', '📦', 'If not recycled, landfills accumulate bulky organic waste.', '♻️ Recyclable'),
(3, 'Paper Waste', 1, 'Mixed paper waste and documents', 4, 'kg', '📃', 'If not recycled, trees continue to be cut down unnecessarily.', '♻️ Recyclable');

-- Plastic Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(4, 'Plastic Bottles', 2, 'PET plastic bottles (1L-2L)', 10, 'kg', '🍾', 'If not recycled, ocean plastics harm marine life for centuries.', '♻️ Recyclable'),
(5, 'Plastic Bags', 2, 'Plastic bags and films', 8, 'kg', '🛍️', 'If not recycled, animals mistake plastic for food and die.', '♻️ Recyclable'),
(6, 'Plastic Containers', 2, 'Food containers and packaging', 12, 'kg', '🏺', 'If not recycled, microplastics contaminate drinking water.', '♻️ Recyclable');

-- Metal Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(7, 'Aluminum Cans', 3, 'Aluminum beverage cans', 60, 'kg', '🥫', 'If not recycled, mining new aluminum requires 14 times more energy.', '♻️ Recyclable'),
(8, 'Copper Wire', 3, 'Copper wiring and cables', 350, 'kg', '🔌', 'If not recycled, valuable copper deposits become depleted.', '♻️ Recyclable'),
(9, 'Steel Scrap', 3, 'Steel and iron scrap material', 15, 'kg', '⚙️', 'If not recycled, new steel production creates massive carbon emissions.', '♻️ Recyclable');

-- E-Waste Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(10, 'Television', 4, 'Old LCD/LED TV sets', 2000, 'unit', '📺', 'If not recycled, toxic metals and plastics can contaminate soil and water.', '⚠️ E-Waste'),
(11, 'Laptop', 4, 'Old laptop computers', 1500, 'unit', '💻', 'If not recycled, hazardous chemicals may leak into the environment.', '⚠️ E-Waste'),
(12, 'Mobile Phone', 4, 'Old smartphones for recycling', 500, 'unit', '📱', 'If not recycled, valuable metals like gold, silver and copper are lost.', '⚠️ E-Waste'),
(13, 'Desktop PC', 4, 'Old desktop computers', 1800, 'unit', '🖥️', 'If not recycled, heavy metals like lead and mercury poison the soil.', '⚠️ E-Waste'),
(14, 'Monitor', 4, 'Old computer monitors', 600, 'unit', '🖨️', 'If not recycled, phosphors and lead can damage ground and water systems.', '⚠️ E-Waste');

-- Appliance Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(15, 'AC Unit', 5, 'Old air conditioning unit', 2500, 'unit', '🌬️', 'If not recycled properly, refrigerant gases can damage the ozone layer.', '♻️ Recyclable'),
(16, 'Refrigerator', 5, 'Old refrigerator', 3000, 'unit', '❄️', 'If not recycled, refrigerant gases can contribute to global warming.', '♻️ Recyclable'),
(17, 'Washing Machine', 5, 'Old washing machine', 2800, 'unit', '🧺', 'If not recycled, toxic detergent residues can contaminate water supplies.', '♻️ Recyclable'),
(18, 'Microwave', 5, 'Old microwave oven', 800, 'unit', '🍳', 'If not recycled, radiation and electronic components can harm ecosystems.', '♻️ Recyclable');

-- Vehicle Items
INSERT IGNORE INTO scrap_items.items (id, name, category_id, description, price_per_unit, unit, emoji, environmental_warning, badge) VALUES
(19, 'Old Car', 6, 'Scrapped vehicle for parts', 15000, 'unit', '🚗', 'If not recycled, 75% of vehicle materials could be recovered and reused.', '♻️ Recyclable'),
(20, 'Motorcycle', 6, 'Old motorcycle for scrap', 5000, 'unit', '🏍️', 'If not recycled, engine oil and fluids contaminate groundwater.', '♻️ Recyclable'),
(21, 'Bicycle', 6, 'Old bicycle for recycling', 300, 'unit', '🚲', 'If not recycled, metal frames rust and require mining to replace.', '♻️ Recyclable');

-- ============================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_scrap_category ON scrap_items.items(category_id);
CREATE INDEX idx_scrap_active ON scrap_items.items(is_active);
CREATE INDEX idx_listing_user ON scrap_items.user_listings(user_id);
CREATE INDEX idx_listing_status ON scrap_items.user_listings(status);
CREATE INDEX idx_transaction_seller ON scrap_items.transactions(seller_id);
CREATE INDEX idx_transaction_buyer ON scrap_items.transactions(buyer_id);

-- ============================================================
-- VIEWS FOR EASY QUERYING
-- ============================================================
CREATE OR REPLACE VIEW scrap_items.v_items_with_category AS
SELECT 
  i.id,
  i.name,
  i.description,
  i.price_per_unit,
  i.unit,
  i.emoji,
  i.environmental_warning,
  c.name as category_name,
  c.emoji as category_emoji
FROM scrap_items.items i
LEFT JOIN scrap_items.categories c ON i.category_id = c.id
WHERE i.is_active = TRUE;

CREATE OR REPLACE VIEW scrap_items.v_user_listings_detailed AS
SELECT 
  ul.id,
  ul.user_id,
  u.full_name as seller_name,
  u.phone as seller_phone,
  ul.item_id,
  i.name as item_name,
  i.category_id,
  c.name as category_name,
  ul.quantity,
  ul.unit,
  ul.location,
  ul.status,
  ul.created_at
FROM scrap_items.user_listings ul
JOIN auth.users u ON ul.user_id = u.id
JOIN scrap_items.items i ON ul.item_id = i.id
JOIN scrap_items.categories c ON i.category_id = c.id;

-- ============================================================
-- SUMMARY
-- ============================================================
-- Database Name: appdb
-- Total Schemas: 8
-- Total Tables: 20+
-- Design: Microservices with isolated schemas
-- User Management: Yes (auth schema)
-- Location: Typically MySQL/PostgreSQL on port 3306/5432
-- ============================================================
