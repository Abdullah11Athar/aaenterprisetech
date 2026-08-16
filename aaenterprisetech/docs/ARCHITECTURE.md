# System Architecture & 100,000+ User Scaling Blueprint

## 1. System Architecture Diagram

```mermaid
graph TD
    subgraph Client Layer
        Web[Next.js App Router - Vercel Edge CDN]
        Mobile[Future React Native / Mobile App]
    end

    subgraph API & Edge Middleware
        API[Next.js Serverless API Routes]
        Edge[Supabase Edge Functions / Deno]
    end

    subgraph Data & Storage Layer
        SupaDB[(Supabase PostgreSQL 15 - Primary Read/Write)]
        Replica[(Read Replicas - Connection Pooling via Supavisor)]
        SupaStore[Supabase Storage - KYC Documents]
    end

    subgraph Financial & Payment Infrastructure
        StripeConnect[Stripe Connect Express Platform]
        StripeWebhooks[Stripe Webhook Listener]
    end

    subgraph Automation & Monitoring
        n8n[Self-Hosted n8n Workflow Engine - Hetzner VPS]
        Resend[Resend API - Transactional Emails]
        Sentry[Sentry Error Monitoring]
        PostHog[PostHog Product Analytics]
    end

    Web -->|HTTPS / WSS| API
    Mobile -->|REST / GraphQL| API
    API <-->|PgBouncer / Supavisor| SupaDB
    API <-->|Signed URLs| SupaStore
    
    API <-->|Stripe SDK| StripeConnect
    StripeConnect -->|Webhooks| StripeWebhooks
    StripeWebhooks -->|Idempotent Event Log| SupaDB
    
    StripeWebhooks -->|Trigger Event| n8n
    n8n -->|Send Receipts| Resend
    
    Web --> Sentry
    Web --> PostHog
```

---

## 2. Scalability Architecture for 100,000+ Active Users

To scale from MVP to over 100,000 active freelancers without structural refactoring, the following architectural paradigms are enforced:

### 2.1 Database Scaling & Partitioning
- **Connection Pooling**: Utilize **Supavisor** (Supabase's tenant-aware connection pooler) to handle up to 50,000 concurrent database client connections.
- **Table Partitioning**:
  - `invoices` and `transactions` tables are range-partitioned by `created_at` (monthly partitions) to maintain query latency under 15ms even with 50M+ row counts.
- **Read Replicas**: Separate read-heavy dashboard traffic to read replicas while routing financial mutations directly to the primary database node.

### 2.2 Serverless Edge Caching
- **Vercel Edge Network**: Static invoice assets and public checkout views (`/pay/[token]`) are cached globally on Vercel's CDN with Stale-While-Revalidate (SWR) revalidation.
- **Redis Caching Layer**: Upstash Redis integration for user session tokens, rate-limiting counters, and real-time exchange rates.

### 2.3 Webhook Idempotency & Queueing
- Incoming Stripe webhooks are immediately written to the `webhook_events` table and acknowledged with a `200 OK` response within 200ms to prevent Stripe retries.
- Background worker queues (via n8n or BullMQ on Hetzner VPS) asynchronously process notifications, email delivery, and transaction ledger updates.
