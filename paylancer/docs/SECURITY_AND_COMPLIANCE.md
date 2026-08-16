# Security Architecture & Financial Compliance Framework

## 1. Compliance Standards

### 1.1 PCI-DSS SAQ A Compliance
- **Zero Card Data Touch**: PayLancer platform servers never process, transmit, or store sensitive cardholder data (PAN, CVV, PIN).
- **Stripe Hosted Checkout / Elements**: All card entry inputs are hosted entirely within Stripe's PCI Level 1 compliant iframe containers.
- **Scope Attestation**: Eligible for Self-Assessment Questionnaire A (SAQ A), reducing compliance overhead to annual policy verification.

### 1.2 KYC (Know Your Customer) & AML (Anti-Money Laundering)
- **Multi-Level Verification**:
  1. **Tier 1 (Basic)**: Identity Verification via CNIC / Government ID + Proof of Address.
  2. **Tier 2 (Stripe Express)**: Bank Account Verification + Tax Identification Number (TIN).
- **Sanctions Screening**: Automated screening against OFAC, PEP (Politically Exposed Persons), and international sanctions lists via Stripe Connect onboarding.

### 1.3 Regional Regulations (Pakistan State Bank Guidelines)
- **R-Form & Foreign Exchange Reporting**: Automated generation of digital e-remittance statements to allow Pakistani freelancers to declare foreign exchange earnings under State Bank of Pakistan IT export guidelines.

---

## 2. Platform Security Checklist

| Category | Security Measure | Implementation Mechanism | Status |
| :--- | :--- | :--- | :--- |
| **Authentication** | JWT + Refresh Tokens | Supabase Auth with PKCE flow | ✅ Enforced |
| **Authorization** | Row Level Security (RLS) | PostgreSQL RLS on all 15 tables | ✅ Enforced |
| **Data Encryption** | In-Transit Encryption | TLS 1.3 mandatory with HSTS headers | ✅ Enforced |
| **Data Encryption** | At-Rest Encryption | AES-256 (Supabase Storage & PostgreSQL) | ✅ Enforced |
| **Bot & Brute-Force** | Rate Limiting | Upstash Redis sliding window (100 req/min) | ✅ Enforced |
| **Input Security** | XSS & Injection | Zod schema validation + Parameterized DDL | ✅ Enforced |
| **CSRF Protection** | SameSite Cookies | SameSite=Strict HTTP-Only Cookie Flags | ✅ Enforced |
| **Audit Logs** | Immutable Ledger | `activity_logs` & `admin_logs` tables | ✅ Enforced |
