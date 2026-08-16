-- ============================================================================
-- GLOBAL FREELANCER INTERNATIONAL PAYMENT SAAS PLATFORM
-- Database Schema Migration (PostgreSQL DDL for Supabase RLS)
-- Target DB Version: PostgreSQL 15+ / Supabase
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
CREATE TYPE user_role AS ENUM ('freelancer', 'client', 'admin', 'super_admin');
CREATE TYPE kyc_status AS ENUM ('unverified', 'pending', 'approved', 'rejected', 'action_required');
CREATE TYPE invoice_status AS ENUM ('draft', 'issued', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'succeeded', 'failed', 'refunded', 'disputed');
CREATE TYPE payout_status AS ENUM ('pending', 'in_transit', 'paid', 'failed', 'canceled');
CREATE TYPE stripe_account_status AS ENUM ('uncreated', 'pending_onboarding', 'active', 'restricted', 'disabled');
CREATE TYPE transaction_type AS ENUM ('payment_charge', 'platform_fee', 'payout_transfer', 'refund', 'chargeback', 'subscription_fee');

-- ============================================================================
-- 3. TABLES DEFINITION
-- ============================================================================

-- A. USERS TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'freelancer' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- B. PROFILES TABLE (Freelancer Details & KYC Metadata)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    business_name TEXT,
    phone_number TEXT,
    country VARCHAR(3) DEFAULT 'PAK' NOT NULL, -- ISO Alpha-3
    city TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    postal_code TEXT,
    tax_id TEXT,
    kyc_status kyc_status DEFAULT 'unverified' NOT NULL,
    kyc_documents JSONB DEFAULT '{}'::jsonb,
    kyc_verified_at TIMESTAMPTZ,
    payout_preference TEXT DEFAULT 'stripe_express',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- C. STRIPE ACCOUNTS TABLE (Stripe Connect Express / Custom Mapping)
CREATE TABLE IF NOT EXISTS public.stripe_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_account_id TEXT UNIQUE NOT NULL,
    account_type TEXT DEFAULT 'express' NOT NULL,
    details_submitted BOOLEAN DEFAULT FALSE NOT NULL,
    charges_enabled BOOLEAN DEFAULT FALSE NOT NULL,
    payouts_enabled BOOLEAN DEFAULT FALSE NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    country VARCHAR(2) DEFAULT 'US' NOT NULL,
    status stripe_account_status DEFAULT 'pending_onboarding' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- D. INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT NOT NULL,
    freelancer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_company TEXT,
    client_address TEXT,
    status invoice_status DEFAULT 'draft' NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) DEFAULT 0.00,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    platform_fee_rate NUMERIC(5, 2) DEFAULT 1.00 NOT NULL, -- 1% platform fee
    platform_fee_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    freelancer_net_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    due_date DATE NOT NULL,
    issued_date DATE DEFAULT CURRENT_DATE NOT NULL,
    notes TEXT,
    terms TEXT,
    payment_link_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_invoice_number_per_freelancer UNIQUE (freelancer_id, invoice_number)
);

-- E. INVOICE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL DEFAULT 1.00,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- F. PAYMENTS TABLE (Stripe Charge & Intent Ledger)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT UNIQUE NOT NULL,
    stripe_charge_id TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    status payment_status DEFAULT 'pending' NOT NULL,
    payment_method_type TEXT, -- e.g. card, apple_pay, google_pay
    platform_fee_deducted NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    stripe_processing_fee NUMERIC(12, 2) DEFAULT 0.00,
    net_payout_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    failure_reason TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- G. PAYOUTS TABLE (Transfers to Connected Accounts / Local Banks)
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    freelancer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_payout_id TEXT UNIQUE,
    stripe_transfer_id TEXT UNIQUE,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    destination_bank_last4 TEXT,
    status payout_status DEFAULT 'pending' NOT NULL,
    arrival_date DATE,
    failure_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- H. TRANSACTIONS TABLE (Double-Entry Financial Ledger)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
    payout_id UUID REFERENCES public.payouts(id) ON DELETE SET NULL,
    type transaction_type NOT NULL,
    gross_amount NUMERIC(12, 2) NOT NULL,
    fee_amount NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    net_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- I. SUBSCRIPTIONS TABLE (Platform SaaS Billing if applicable)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT UNIQUE,
    plan_tier TEXT DEFAULT 'starter' NOT NULL, -- starter, pro, enterprise
    status TEXT DEFAULT 'active' NOT NULL,
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- J. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- K. ACTIVITY LOGS TABLE (Compliance & Security Audit Trail)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- L. ADMIN LOGS TABLE (Privileged Operations Log)
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    reason TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- M. API KEYS TABLE (Developer / Programmatic API Access)
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    key_name TEXT NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    scopes JSONB DEFAULT '["read", "write"]'::jsonb NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- N. WEBHOOK EVENTS TABLE (Webhook Idempotency & Audit)
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT UNIQUE NOT NULL, -- Stripe Event ID
    event_type TEXT NOT NULL,
    provider TEXT DEFAULT 'stripe' NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE NOT NULL,
    processing_error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INDEXES FOR HIGH-PERFORMANCE QUERIES
-- ============================================================================
CREATE INDEX idx_invoices_freelancer ON public.invoices(freelancer_id);
CREATE INDEX idx_invoices_token ON public.invoices(payment_link_token);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX idx_payments_stripe_pi ON public.payments(stripe_payment_intent_id);
CREATE INDEX idx_payouts_freelancer ON public.payouts(freelancer_id);
CREATE INDEX idx_transactions_user ON public.transactions(user_id);
CREATE INDEX idx_webhook_events_id ON public.webhook_events(event_id);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read);

-- ============================================================================
-- 5. AUTOMATED UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_stripe_accounts_timestamp BEFORE UPDATE ON public.stripe_accounts FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_invoices_timestamp BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_payments_timestamp BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_payouts_timestamp BEFORE UPDATE ON public.payouts FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
CREATE POLICY "Users can view own account" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins full access users" ON public.users FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- STRIPE ACCOUNTS POLICIES
CREATE POLICY "Freelancers view own Stripe account" ON public.stripe_accounts FOR SELECT USING (auth.uid() = user_id);

-- INVOICES POLICIES
CREATE POLICY "Freelancers view own invoices" ON public.invoices FOR SELECT USING (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers insert own invoices" ON public.invoices FOR INSERT WITH CHECK (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers update own invoices" ON public.invoices FOR UPDATE USING (auth.uid() = freelancer_id);
CREATE POLICY "Public guest checkout read invoice by token" ON public.invoices FOR SELECT USING (true); -- Public checkout access

-- INVOICE ITEMS POLICIES
CREATE POLICY "Freelancers view own invoice items" ON public.invoice_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.invoices WHERE id = invoice_items.invoice_id AND freelancer_id = auth.uid())
);
CREATE POLICY "Public read invoice items for checkout" ON public.invoice_items FOR SELECT USING (true);

-- PAYMENTS & PAYOUTS POLICIES
CREATE POLICY "Freelancers view own payments" ON public.payments FOR SELECT USING (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers view own payouts" ON public.payouts FOR SELECT USING (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
