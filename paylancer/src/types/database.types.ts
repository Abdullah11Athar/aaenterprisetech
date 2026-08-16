export type UserRole = 'freelancer' | 'client' | 'admin' | 'super_admin';
export type KYCStatus = 'unverified' | 'pending' | 'approved' | 'rejected' | 'action_required';
export type InvoiceStatus = 'draft' | 'issued' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded' | 'disputed';
export type PayoutStatus = 'pending' | 'in_transit' | 'paid' | 'failed' | 'canceled';
export type StripeAccountStatus = 'uncreated' | 'pending_onboarding' | 'active' | 'restricted' | 'disabled';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  business_name?: string;
  phone_number?: string;
  country: string;
  city?: string;
  address_line1?: string;
  tax_id?: string;
  kyc_status: KYCStatus;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface StripeAccount {
  id: string;
  user_id: string;
  stripe_account_id: string;
  account_type: string;
  details_submitted: boolean;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  currency: string;
  country: string;
  status: StripeAccountStatus;
  created_at: string;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  freelancer_id: string;
  client_name: string;
  client_email: string;
  client_company?: string;
  client_address?: string;
  status: InvoiceStatus;
  currency: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  platform_fee_rate: number;
  platform_fee_amount: number;
  freelancer_net_amount: number;
  due_date: string;
  issued_date: string;
  notes?: string;
  terms?: string;
  payment_link_token: string;
  paid_at?: string;
  created_at: string;
  items?: InvoiceItem[];
}

export interface Payment {
  id: string;
  invoice_id: string;
  freelancer_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method_type?: string;
  platform_fee_deducted: number;
  net_payout_amount: number;
  created_at: string;
}
