# Testing Strategy & Financial Cost Estimation

## 1. Testing Strategy

### 1.1 Automated Testing Matrix
- **Unit Testing**: Jest + React Testing Library for invoice calculation logic (Subtotal, Tax, Discount, Platform Fee).
- **Integration Testing**: Playwright for end-to-end user flows (Sign Up -> Stripe Express Onboarding -> Invoice Creation -> Client Payment Checkout).
- **Webhook Webhook Testing**: Stripe CLI for local event forwarding:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

---

## 2. Monthly Infrastructure Cost Estimation

| Service | Tier / Plan | Estimated Monthly Cost | Purpose |
| :--- | :--- | :--- | :--- |
| **Vercel** | Pro Tier | $20.00 | Next.js Frontend & API Hosting |
| **Supabase** | Pro Tier | $25.00 | PostgreSQL DB, Auth, Storage & Realtime |
| **Hetzner VPS** | CPX21 (3 vCPU, 4GB RAM) | $7.50 | Self-hosted n8n Automation Engine |
| **Resend** | Pro Plan | $20.00 | Transactional Email Delivery (50k emails) |
| **Sentry** | Team Plan | $26.00 | Error Tracking & Performance Monitoring |
| **PostHog** | Growth Tier (Free allowance) | $0.00 | Product Analytics |
| **Domain & SSL** | Cloudflare / Namecheap | $1.25 | DNS Management & Free SSL |
| **Total Base Monthly Overhead** | — | **~$99.75 / month** | **Supports up to 10,000 active users** |

---

## 3. Unit Economics & Revenue Projections (100k Users)

Assuming 100,000 active freelancers each processing an average of $2,000/month:
- **Total Monthly Gross Volume Processed**: $200,000,000
- **Platform Fee Rate**: 1.0%
- **Gross SaaS Platform Revenue**: **$2,000,000 / month**
- **Infrastructure Overhead at Scale**: ~$4,500 / month
- **Net Profit Margin**: **> 99%**
