-- ============================================================
-- DATABASE MIGRATION FOR NEW FEATURES
-- ScrapNinja - New Collectors, Vendor Map, and B2B Payment Features
-- ============================================================
-- Date: 2026-07-03
-- These changes add support for:
-- 1. Collectors Management (Vendors can create/manage collectors)
-- 2. Vendor Map Display (Show vendor locations on map)
-- 3. Scrap Generation History (Track all scrap transactions)
-- 4. B2B Payment Status (Control marketplace access)
-- ============================================================

-- ============================================================
-- STEP 1: Add Collectors Management Table
-- ============================================================
CREATE TABLE IF NOT EXISTS vendor.collectors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  vendor_id BIGINT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  vehicle_number VARCHAR(50),
  assigned_area VARCHAR(255),
  status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (vendor_id) REFERENCES auth.users(id),
  INDEX idx_vendor (vendor_id),
  INDEX idx_status (status),
  INDEX idx_deleted (is_deleted),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- STEP 2: Add Location Fields to Vendor Applications
-- ============================================================
-- (These fields should be added to existing vendor_applications table if they don't exist)
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS longitude DECIMAL(10, 8);
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS city VARCHAR(255);
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS state VARCHAR(255);
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);

-- ============================================================
-- STEP 3: Add B2B Payment Status Fields to Vendor
-- ============================================================
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS payment_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING';
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS account_status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_APPROVAL') DEFAULT 'PENDING_APPROVAL';
-- ALTER TABLE vendor.vendor_applications ADD COLUMN IF NOT EXISTS payment_approved_date TIMESTAMP NULL;

-- ============================================================
-- STEP 4: Add Scrap Generation History Table
-- ============================================================
CREATE TABLE IF NOT EXISTS scrap_items.scrap_generation_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  transaction_id BIGINT,
  vendor_id BIGINT NOT NULL,
  customer_id BIGINT NOT NULL,
  
  -- Scrap Details
  scrap_name VARCHAR(255) NOT NULL,
  category_id BIGINT,
  category_name VARCHAR(100),
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  weight DECIMAL(10, 2),
  weight_unit VARCHAR(20) DEFAULT 'kg',
  
  -- ESG Impact
  esg_score DECIMAL(5, 2),
  co2_saved DECIMAL(10, 2),
  water_saved DECIMAL(10, 2),
  energy_saved DECIMAL(10, 2),
  
  -- Transaction Details
  total_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'AED',
  status ENUM('PENDING', 'COMPLETED', 'CANCELLED', 'REJECTED') DEFAULT 'COMPLETED',
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'COMPLETED',
  
  -- Vendor Information
  vendor_name VARCHAR(255),
  vendor_business_name VARCHAR(255),
  
  -- Customer Information
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  
  -- Metadata
  notes TEXT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (transaction_id) REFERENCES scrap_items.transactions(id),
  FOREIGN KEY (vendor_id) REFERENCES auth.users(id),
  FOREIGN KEY (customer_id) REFERENCES auth.users(id),
  FOREIGN KEY (category_id) REFERENCES scrap_items.categories(id),
  INDEX idx_vendor (vendor_id),
  INDEX idx_customer (customer_id),
  INDEX idx_status (status),
  INDEX idx_transaction_date (transaction_date),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- STEP 5: Create Indexes for Performance
-- ============================================================
CREATE INDEX idx_collector_vendor ON vendor.collectors(vendor_id);
CREATE INDEX idx_collector_status ON vendor.collectors(status);
CREATE INDEX idx_generation_history_vendor ON scrap_items.scrap_generation_history(vendor_id);
CREATE INDEX idx_generation_history_date ON scrap_items.scrap_generation_history(transaction_date);

-- ============================================================
-- STEP 6: Create Views for Easy Querying
-- ============================================================
CREATE OR REPLACE VIEW vendor.v_vendor_locations AS
SELECT 
  v.id as vendor_id,
  u.full_name as vendor_name,
  va.company_name,
  va.business_address,
  va.latitude,
  va.longitude,
  va.city,
  va.state,
  va.postal_code,
  va.application_status,
  va.approved_date,
  COUNT(DISTINCT c.id) as active_collectors,
  u.is_active
FROM vendor.vendor_applications va
JOIN auth.users u ON va.user_id = u.id
JOIN vendor.vendors v ON u.id = v.user_id
LEFT JOIN vendor.collectors c ON v.id = c.vendor_id AND c.is_deleted = FALSE AND c.status = 'ACTIVE'
WHERE u.role = 'VENDOR' AND u.is_active = TRUE
GROUP BY v.id, u.full_name, va.company_name, va.business_address, va.latitude, va.longitude, va.city, va.state, va.postal_code, va.application_status, va.approved_date, u.is_active;

CREATE OR REPLACE VIEW vendor.v_collector_details AS
SELECT 
  c.id as collector_id,
  c.vendor_id,
  u.full_name as vendor_name,
  va.company_name,
  c.full_name as collector_name,
  c.mobile_number,
  c.email,
  c.address,
  c.vehicle_number,
  c.assigned_area,
  c.status,
  c.created_at,
  c.updated_at
FROM vendor.collectors c
JOIN auth.users u ON c.vendor_id = u.id
LEFT JOIN vendor.vendor_applications va ON u.id = va.user_id
WHERE c.is_deleted = FALSE;

-- ============================================================
-- STEP 7: Create Stored Procedures (Optional)
-- ============================================================
-- Procedure to add entry to scrap generation history
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS add_scrap_generation_history (
  IN p_transaction_id BIGINT,
  IN p_vendor_id BIGINT,
  IN p_customer_id BIGINT,
  IN p_scrap_name VARCHAR(255),
  IN p_category_name VARCHAR(100),
  IN p_quantity DECIMAL(10, 2),
  IN p_unit VARCHAR(50),
  IN p_weight DECIMAL(10, 2),
  IN p_esg_score DECIMAL(5, 2),
  IN p_co2_saved DECIMAL(10, 2),
  IN p_water_saved DECIMAL(10, 2),
  IN p_energy_saved DECIMAL(10, 2),
  IN p_total_price DECIMAL(10, 2),
  IN p_status VARCHAR(50),
  IN p_vendor_name VARCHAR(255),
  IN p_customer_name VARCHAR(255)
)
BEGIN
  INSERT INTO scrap_items.scrap_generation_history (
    transaction_id, vendor_id, customer_id, scrap_name, category_name, quantity, unit, 
    weight, esg_score, co2_saved, water_saved, energy_saved, total_price, status, 
    vendor_name, customer_name, completed_date
  ) VALUES (
    p_transaction_id, p_vendor_id, p_customer_id, p_scrap_name, p_category_name, p_quantity, 
    p_unit, p_weight, p_esg_score, p_co2_saved, p_water_saved, p_energy_saved, p_total_price, 
    p_status, p_vendor_name, p_customer_name, NOW()
  );
END$$

DELIMITER ;

-- ============================================================
-- STEP 8: Grant Permissions
-- ============================================================
GRANT ALL ON vendor.collectors TO admin;
GRANT ALL ON scrap_items.scrap_generation_history TO admin;
GRANT SELECT ON vendor.v_vendor_locations TO admin;
GRANT SELECT ON vendor.v_collector_details TO admin;

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================
-- Run this migration script after backing up your database
-- Order of execution:
-- 1. Backup current database
-- 2. Run this script
-- 3. Test all new features
-- 4. Deploy to production
-- ============================================================
