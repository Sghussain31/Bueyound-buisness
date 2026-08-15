-- Schema definitions for Business & Beyond community registrations (Clean Setup)

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sequence for safe, collision-free registration_id (e.g. BNB-2026-00001)
CREATE SEQUENCE IF NOT EXISTS registration_id_seq START WITH 1 INCREMENT BY 1;

-- Optional helper function to fetch next registration ID cleanly
CREATE OR REPLACE FUNCTION get_next_registration_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'BNB-2026-' || LPAD(nextval('registration_id_seq')::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- Create registrations table (Fresh Setup)
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT UNIQUE NOT NULL DEFAULT ('BNB-2026-' || LPAD(nextval('registration_id_seq')::TEXT, 5, '0')),
    
    -- About You
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT NOT NULL,
    linkedin TEXT,
    instagram TEXT,
    
    -- About Business
    company_name TEXT NOT NULL,
    role TEXT NOT NULL,
    industry TEXT NOT NULL,
    annual_revenue TEXT NOT NULL,
    business_sector TEXT NOT NULL,
    other_sector TEXT,
    product_service TEXT NOT NULL,
    
    -- Goals
    primary_need TEXT NOT NULL,
    primary_goal TEXT NOT NULL,
    about TEXT NOT NULL,
    
    -- Approval Details
    approval_status TEXT NOT NULL DEFAULT 'PENDING_APPROVAL' CHECK (approval_status IN ('PENDING_APPROVAL', 'APPROVED', 'REJECTED')),
    approval_token_hash TEXT UNIQUE,
    approval_token_expires_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    
    -- Payment Details
    payment_status TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (payment_status IN ('NOT_STARTED', 'PAYMENT_PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED')),
    payment_id TEXT,
    payment_reference TEXT,
    amount NUMERIC(10, 2),
    payment_method TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- System Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) on registrations
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

