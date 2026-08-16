# Product Requirement Document (PRD): PayLancer SaaS

## Executive Summary
PayLancer is an enterprise-grade payment infrastructure SaaS designed to enable international freelancers in Pakistan and worldwide to legally, securely, and seamlessly accept international credit card payments (Visa, Mastercard, Apple Pay, Google Pay) and receive automated payouts directly into their accounts via Stripe Connect Express.

---

## 1. Target Audience & Market Problem
- **Primary Persona**: Pakistani freelancers, software agencies, and digital consultants earning in USD/EUR/GBP.
- **Problem Statement**: Traditional international payout mechanisms in developing markets (e.g. PayPal unavailability in Pakistan, high wire transfer fees, complex banking bureaucracy) force freelancers to lose 5-10% of revenue in conversion markups or risk account lockouts.
- **Solution**: PayLancer provides a legal, compliant marketplace payment model using Stripe Connect Express where clients pay via standard checkout, 1% platform fee is automatically deducted, and remaining net proceeds are transferred to the freelancer.

---

## 2. Product Features & Modules

### 2.1 Freelancer Dashboard
- **Instant Signup & Authentication**: Supabase Auth with OAuth 2.0 and optional 2FA.
- **KYC Verification Portal**: Document upload for CNIC / Passport, proof of address, tax TIN.
- **Stripe Connect Express Onboarding**: Direct OAuth integration with Stripe to establish connected payment accounts.
- **Financial Balance Widget**: Real-time tracking of Available Balance, Pending Payouts, and Lifetime Earnings.

### 2.2 Invoice Engine
- **Itemized Builder**: Add multiple line items, quantity, unit rates.
- **Automated Tax & Discount**: Compute subtotal, configurable tax (%), and discount ($).
- **Multi-Currency Support**: USD, EUR, GBP, AED, CAD, AUD.
- **Direct Payment Link**: One-click generation of sharable payment link (`/pay/[token]`).
- **PDF Export & Resend Email**: Trigger automated transactional PDF receipt delivery via Resend API.

### 2.3 Client Checkout Flow
- **Hosted Payment View**: Mobile-responsive, high-converting checkout interface.
- **Stripe Elements Integration**: Support for Visa, Mastercard, AMEX, Apple Pay, Google Pay.
- **Instant Webhook Updates**: Real-time status update to "PAID" upon Stripe `checkout.session.completed` event.

### 2.4 Platform Admin Panel
- **KYC Review Queue**: One-click approval/rejection of identity verification documents.
- **Global Volume Analytics**: Real-time tracking of total gross volume processed, platform revenue at 1%, active freelancer count.
- **Dispute & Refund Management**: Monitor Stripe chargebacks and initiate full/partial refunds.

---

## 3. Success Metrics (KPIs)
- **Gross Payment Volume (GPV)**: Monthly processed volume across all freelancers.
- **Net Revenue**: 1% platform fee collected.
- **Freelancer Retention**: 30-day and 90-day active invoice creation rates.
- **Payout Velocity**: Average time from client payment to bank settlement (< 48 hours).
