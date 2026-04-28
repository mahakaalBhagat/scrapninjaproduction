-- Schemas for each microservice (isolated namespaces within single appdb)
-- Hibernate ddl-auto=update will create tables inside the correct schema.

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS pickup;
CREATE SCHEMA IF NOT EXISTS pricing;
CREATE SCHEMA IF NOT EXISTS location;
CREATE SCHEMA IF NOT EXISTS enquiry;

-- Grant full access to the application user
GRANT ALL ON SCHEMA auth     TO admin;
GRANT ALL ON SCHEMA pickup   TO admin;
GRANT ALL ON SCHEMA pricing  TO admin;
GRANT ALL ON SCHEMA location TO admin;
GRANT ALL ON SCHEMA enquiry  TO admin;

-- Allow future tables created by Hibernate to be accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA auth     GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA pickup   GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA pricing  GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA location GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA enquiry  GRANT ALL ON TABLES TO admin;
