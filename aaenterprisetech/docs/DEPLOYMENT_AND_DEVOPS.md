# Multi-Cloud Deployment & DevOps Guide

This guide outlines the production deployment setup across Vercel, Supabase Cloud, Hetzner VPS, and self-hosted n8n.

---

## 1. Frontend & API Deployment (Vercel)

1. Connect the GitHub repository `paylancer-saas` to Vercel.
2. Configure Environment Variables in Vercel Dashboard:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJKV1Qi...
   STRIPE_SECRET_KEY=sk_live_51...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Set Build Command: `npm run build`
4. Set Output Directory: `.next`

---

## 2. Database & Auth Setup (Supabase)

1. Create a new Supabase Project in AWS Region closest to target audience (e.g. Frankfurt / Singapore).
2. Execute the migration SQL file:
   ```bash
   npx supabase db push --db-url "postgres://postgres:<password>@db.<project>.supabase.co:5432/postgres"
   ```
3. Enable RLS on all tables (verified in `20260730000000_schema.sql`).

---

## 3. Self-Hosted Automation Engine (n8n on Hetzner VPS)

Deploy n8n on a Hetzner CPX21 VPS ($7/month) using Docker Compose:

### `docker-compose.yml`
```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.paylancer.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://n8n.paylancer.com/
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```
