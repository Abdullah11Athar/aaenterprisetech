# Prompt 2 — Autonomous Performance Marketing AI Agent Challenge

## Privacy and neutrality requirements

This prompt is intentionally platform-neutral.

Do not include, request, infer, or expose:

- Personal information
- Client names
- Real company names
- Website addresses
- Repository links
- Account identifiers
- Access tokens
- Credentials
- Secrets
- Private customer data
- Proprietary service identifiers

Use neutral labels such as:

- Social Advertising Platform
- Search and Video Advertising Platform
- E-commerce Platform
- Web Analytics Platform
- Public Advertising Library

You are a senior AI-agent architect, performance-marketing strategist, marketing data engineer, attribution specialist, e-commerce systems engineer and integration developer.

Build and validate a production-ready, goal-based Performance Marketing AI Agent Skill named:

performance-marketing-agent

The skill must be portable across multiple standards-compliant agent runtimes.

This instruction authorises you to:

- Research current official integration documentation.
- Design the architecture.
- Create the complete skill directory and files.
- Implement supporting scripts and schemas.
- Build mock connectors and dry-run fixtures.
- Validate the skill.
- Run non-production tests.
- Produce an implementation and client-access checklist.

This instruction does not authorise you to:

- Connect to a live advertising account without credentials and permission.
- Pause live ads.
- Change live budgets.
- Publish ads.
- Upload customer data.
- Place secrets inside files.
- Make any financial change during testing.

## 1. Reference Architecture

Use established open-source architectural patterns for inspiration, but do not copy or install an external skill collection.

Focus only on relevant concepts from:

- product-marketing
- ads
- analytics
- ab-testing
- ad-creative
- cro
- competitor-profiling
- marketing-loops

Do not import or combine an entire external skill collection.

Do not turn this project into dozens of loosely connected marketing skills.

Use useful patterns such as:

- Shared product/business context.
- Progressive disclosure.
- Specialist reference playbooks.
- Decision-based analytics.
- Grounded creative generation.
- Experiment logs.
- Dated competitor snapshots.
- Recurring loops with self-checks and stopping conditions.

Our performance-marketing agent must remain one coherent skill with supporting reference files and deterministic scripts.

Do not copy third-party material blindly. Adapt useful concepts to the requirements below. If reusing licensed source code, preserve all legally required attribution.

## 2. Product Definition

Build an operational AI agent, not a chatbot, static dashboard or generic marketing consultant.

The agent must continuously:

1. Understand the client’s business and goal.
2. Discover which authorised platforms are connected.
3. Validate connector connectivity.
4. Validate tracking and attribution quality.
5. Read advertising performance.
6. Read E-commerce Platform orders and product data.
7. Read consented website-funnel events.
8. Join advertising activity with website and commercial outcomes.
9. Identify winners, losers, anomalies and bottlenecks.
10. Diagnose likely reasons for performance changes.
11. Propose specific actions.
12. Execute permitted Social Advertising Platform actions after approval or within an authorised policy.
13. Verify every executed change.
14. Monitor the result.
15. Roll back when a defined failure condition occurs.
16. Recommend Search and Video Advertising Platform changes without executing them.
17. Monitor exactly five relevant competitors.
18. Research relevant public content and advertising patterns.
19. Generate grounded, original creative ideas.
20. Learn safely from historical performance and completed experiments.
21. Report progress against the client’s business goal.

The agent must support clients with any combination of:

- Social Advertising Platform.
- Search and Video Advertising Platform.
- Paid video advertising through the Search and Video Advertising Platform.
- E-commerce Platform.
- e-commerce web pixels.
- E-commerce webhooks.
- Web Analytics Platform.
- Website Performance Audit Tool or website-audit tooling.
- Public Advertising Library.
- Authorised browsing or crawling connectors.
- Authorised third-party competitor-research connectors.

Do not require all connectors.

If only one authorised connector exists, use it and clearly state the measurement limitations.

## 3. Non-Negotiable Platform Policy

### Social Advertising Platform

The Social Advertising Platform is the only advertising platform where the first version may execute financial or campaign-status changes.

Supported Social Advertising Platform actions:

- Pause campaign.
- Pause ad set.
- Pause ad.
- Enable previously paused campaign, ad set or ad only when specifically approved.
- Increase campaign or ad-set budget.
- Decrease campaign or ad-set budget.

Do not support automatic deletion.

Do not support unrestricted campaign creation in version one.

Every Social Advertising Platform change must require either:

A. Explicit human approval for that exact action.

or:

B. A previously approved automatic-action policy containing strict financial and operational limits.

### Search and Video Advertising Platform

Search and Video Advertising Platform must be read-only and recommendation-only in version one.

The agent may analyse Search and Video Advertising Platform performance and produce precise change instructions, but it must never call Search and Video Advertising Platform mutation endpoints.

This restriction applies even if the supplied platform credential technically has write permissions.

Do not expose Search and Video Advertising Platform write tools to the agent.

### Competitors

Monitor exactly five selected competitors per client.

Do not expand the watchlist without approval.

### E-commerce Platform

E-commerce Platform must remain read-only for commerce data.

The agent must never:

- Change products.
- Change prices.
- Alter inventory.
- Fulfil orders.
- Cancel orders.
- Refund orders.
- Access full payment information.

## 4. Research Before Implementation

Before writing platform adapters, review the latest official documentation for:

- official social-advertising integration documentation.
- official social-advertising reporting documentation.
- Social Advertising Platform permissions.
- browser and server-side conversion-tracking documentation.
- social-ad event deduplication.
- Public Advertising Library.
- official search-and-video advertising integration documentation.
- search-and-video advertising reporting.
- search-and-video campaign limitations.
- approved E-commerce administration interface.
- E-commerce Platform access scopes.
- e-commerce web pixels.
- e-commerce customer events.
- e-commerce customer-privacy interface.
- E-commerce webhooks.
- authorised web-analytics reporting interface.
- web-analytics e-commerce events.
- Website Performance Audit Tool interface if used.

Record in a reference file:

- Documentation URL.
- Date checked.
- Current supported interface version.
- Required permissions.
- Read capabilities.
- Write capabilities.
- Rate limits where documented.
- Data latency.
- Attribution limitations.
- Unsupported operations.
- Privacy considerations.
- Deprecation risks.

Never rely on hard-coded assumptions when the platform documentation can be checked.

Never invent interface fields, scopes, endpoints or competitor metrics.

## 5. Required Skill Architecture

Create the skill using progressive disclosure.

Keep the central SKILL.md focused on:

- Triggering.
- Core workflow.
- Reference routing.
- Tool-selection rules.
- Safety rules.
- Approval rules.
- Output requirements.

Keep SKILL.md under approximately 500 lines.

Place detailed platform rules and operational logic in reference files.

Create a structure similar to:

performance-marketing-agent/
├── SKILL.md
├── agents/
│   └── agent-config.yaml
├── references/
│   ├── business-context.md
│   ├── connector-capabilities.md
│   ├── onboarding.md
│   ├── social-ad-operations.md
│   ├── search-video-analysis.md
│   ├── ecommerce-tracking.md
│   ├── analytics-attribution.md
│   ├── metric-definitions.md
│   ├── funnel-diagnostics.md
│   ├── goal-planning.md
│   ├── decision-engine.md
│   ├── approval-guardrails.md
│   ├── competitor-intelligence.md
│   ├── creative-intelligence.md
│   ├── experimentation-learning.md
│   ├── recurring-loops.md
│   ├── reporting.md
│   ├── security-privacy.md
│   ├── failure-modes.md
│   └── tool-contracts.md
├── scripts/
│   ├── validate_config.py
│   ├── connector_health.py
│   ├── normalize_metrics.py
│   ├── audit_tracking.py
│   ├── calculate_unit_economics.py
│   ├── calculate_goal_feasibility.py
│   ├── analyze_funnel.py
│   ├── evaluate_campaign.py
│   ├── detect_anomalies.py
│   ├── detect_creative_fatigue.py
│   ├── build_action_proposal.py
│   ├── validate_social_ad_action.py
│   ├── execute_social_ad_action.py
│   ├── verify_social_ad_action.py
│   ├── evaluate_rollback.py
│   ├── competitor_snapshot.py
│   ├── competitor_diff.py
│   ├── generate_creative_brief.py
│   └── generate_report.py
└── schemas/
    ├── client-config.schema.json
    ├── connector.schema.json
    ├── normalized-metric.schema.json
    ├── funnel-event.schema.json
    ├── goal.schema.json
    ├── recommendation.schema.json
    ├── approval.schema.json
    ├── action.schema.json
    ├── experiment.schema.json
    └── competitor-observation.schema.json

Adapt filenames if the target target agent-skill specification requires a different layout, but preserve separation of concerns.

Do not create unnecessary README, changelog or installation-guide files inside the skill.

## 6. Runtime Architecture

The skill is the agent’s operating brain, but continuous execution requires an external runtime.

Design interfaces for:

- Secrets manager.
- Platform connectors.
- Scheduler.
- Background workers.
- Database.
- Event-ingestion endpoint.
- Approval mechanism.
- Notification/report delivery.
- Audit logging.
- Emergency stop.

Recommend a lightweight development setup and a production setup.

Development may use:

- Local environment variables.
- SQLite.
- Mock connectors.
- Local scheduler.
- Dry-run action executor.

Production should support:

- Secure secrets manager.
- PostgreSQL or equivalent.
- Queue/worker system.
- Encrypted storage.
- Tenant isolation.
- Webhook verification.
- Monitoring and alerts.
- Automated backups.
- Idempotent jobs.

Do not store runtime data or credentials inside the skill folder.

## 7. Shared Client Business Context

Create a versioned client-specific business context used by every workflow.

Recommended runtime location:

clients/<client-id>/business-context.md

Include:

### Business

- Business name.
- Website.
- E-commerce Platform shop domain.
- Category.
- Business model.
- Currency.
- Account timezone.
- Countries and cities served.
- Fulfilment limitations.
- Payment methods.
- Shipping policy.

### Products

- Main products.
- Variants.
- Prices.
- Gross margin.
- Contribution margin.
- Inventory.
- Fulfilment capacity.
- Refund/cancellation rates.
- Seasonality.

### Customer

- Ideal customer.
- Key personas.
- Main problem.
- Jobs to be done.
- Objections.
- Buying triggers.
- Customer language.
- Reasons customers do not buy.

### Positioning

- Value proposition.
- Differentiators.
- Offer.
- Proof.
- Trust signals.
- Brand voice.
- Claims that may be used.
- Claims that must not be used.
- Compliance restrictions.

### Goals

- Primary target.
- Amount.
- Deadline.
- Budget.
- Target ROAS.
- Target CAC/CPA.
- Minimum acceptable profit.
- Risk tolerance.
- Protected campaigns.
- Success definition.

### Competitors

- Five approved competitors.
- URLs and public profiles.
- Relevant keywords.
- Countries to observe.
- Monitoring cadence.

Create a document version, last-updated date and append-only change history.

Every workflow must read this context before asking questions.

Ask only for information that is genuinely missing.

## 8. Dynamic Connector Onboarding

Do not ask for every connector at once.

First ask:

1. Which advertising platforms are currently used?
2. Is the website E-commerce Platform?
3. Is Web Analytics Platform installed?
4. Is a e-commerce web pixel already installed?
5. Which connections have already been authorised?
6. What business goal should the agent pursue?
7. Which Social Advertising Platform action mode is allowed?
8. Who approves actions?
9. How should reports be delivered?

Create a connector registry containing:

- Client ID.
- Connector type.
- Account/store/property ID.
- Authentication status.
- Granted scopes.
- Read capability.
- Write capability.
- interface version.
- Token expiry.
- Last successful sync.
- Last failed sync.
- Data freshness.
- Currency.
- Timezone.
- Rate-limit status.
- Tracking-confidence score.
- Known limitations.

Before using a connector:

1. Perform a harmless read-only health check.
2. Validate permissions.
3. Validate account identity.
4. Validate timezone and currency.
5. Record capability.
6. Refuse unsupported operations.

Never ask for tokens to be pasted into conversational chat.

Provide environment-variable or secrets-manager names.

## 9. Social Advertising Platform Connector

Support Social Advertising Platform account discovery and reporting for:

- Campaigns.
- Ad sets.
- Ads.
- Creatives.
- Status.
- Objective.
- Optimisation goal.
- Budget.
- Bid strategy where readable.
- Attribution settings.
- Learning status where available.
- Insights.
- Placement.
- Device.
- Geography.
- Demographics where legally and technically available.

Read metrics where available:

- Spend.
- Impressions.
- Reach.
- Frequency.
- CPM.
- Clicks.
- Link clicks.
- Outbound clicks.
- Unique outbound clicks.
- Landing-page views.
- CTR.
- CPC.
- Video starts.
- Video watch percentages.
- Leads.
- Add-to-cart events.
- Checkout events.
- Purchases.
- Purchase value.
- Cost per result.
- CPA.
- ROAS.

Required authentication planning should cover:

- Social Advertising Platform developer application.
- Business ID.
- Ad account IDs.
- Access token or system-user method.
- `read-only advertising permission`.
- `campaign-management permission` for approved actions.
- Pixel/dataset ID.
- Relevant page and social-profile identifiers when required.

Request only the least privilege necessary.

## 10. Search And Video Advertising Connector

Implement read-only reporting for:

- Search.
- Shopping.
- Display.
- Automated cross-channel campaigns.
- Demand-generation campaigns.
- Supported paid-video campaigns.

Read where available:

- Spend/cost.
- Impressions.
- Clicks.
- CTR.
- CPC.
- Conversions.
- Conversion value.
- Conversion rate.
- CPA.
- ROAS.
- Search terms.
- Keywords.
- Match types.
- Negative-keyword opportunities.
- Impression share.
- Lost impression share from budget.
- Lost impression share from rank.
- Product performance.
- Asset groups.
- Placement/channel performance.
- Device.
- Geography.
- Day/time.
- Video views.
- View rate.
- CPV.
- Video completion metrics.
- Publicly supported video engagement metrics.

Use the official reporting interface for paid video-campaign analysis.

Do not confuse public channel analytics with paid advertising performance.

Create recommendation cards containing:

- Account.
- Campaign.
- Object ID.
- Current state.
- Proposed manual change.
- Evidence.
- Expected benefit.
- Risk.
- Confidence.
- Instructions for applying it.
- Monitoring period.
- Rollback recommendation.

Do not implement mutation tools for the Search and Video Advertising Platform.

## 11. E-Commerce Admin Connector

Use approved E-commerce administration interface.

Minimum read scopes should cover:

- `read_orders`
- `read_products`
- `read_inventory`

Use `read_customers` only when the client specifically approves repeat-purchase or customer-cohort analysis.

Read:

- Orders.
- Order IDs.
- Order timestamps.
- Revenue.
- Currency.
- Products.
- Variants.
- Quantity.
- Discounts.
- Refunds.
- Cancellations.
- Financial status.
- Fulfilment status.
- Inventory.
- Customer repeat status only when permitted.
- Landing/attribution information where legitimately available.

Never request:

- Product write access.
- Order write access.
- Inventory write access.
- Payment data access.
- Unnecessary customer data.

Use E-commerce webhooks where appropriate for:

- New orders.
- Updated orders.
- Cancelled orders.
- Refund events.
- App uninstallation.
- Relevant privacy events.

Verify webhook signatures.

Deduplicate webhook delivery using stable event IDs.

## 12. E-Commerce Web Pixel

The client does not “get” a Web Pixel credential.

The implementation team must create and install either:

- An application-managed E-commerce pixel, preferred for a reusable implementation.
- A custom web pixel for a controlled single-store implementation.

Generate the required Web Pixel implementation plan and code.

Name it:

Performance Tracking Pixel

Subscribe to standard e-commerce customer events where available:

- `page_viewed`
- `collection_viewed`
- `product_viewed`
- `search_submitted`
- `product_added_to_cart`
- `product_removed_from_cart`
- `cart_viewed`
- `checkout_started`
- relevant checkout progress events
- `checkout_completed`

Record only necessary properties:

- Event ID.
- Client/session identifier.
- Event name.
- Sequence.
- Timestamp.
- Page URL.
- Referrer.
- UTM source.
- UTM medium.
- UTM campaign.
- UTM content.
- UTM term.
- social-ad click identifier.
- search-ad click identifier.
- Product ID.
- Variant ID.
- Product name where appropriate.
- Quantity.
- Value.
- Currency.
- Device category.
- Consent status.
- Ad/campaign identifiers when available.

Do not send secrets through the browser.

Do not collect unnecessary PII.

Send events to a secure first-party ingestion endpoint.

Respect e-commerce customer-privacy interface and regional consent rules.

Document:

- Client approval required.
- Installation method.
- Endpoint configuration.
- Event schema.
- Consent behaviour.
- Debug procedure.
- Duplicate-event prevention.
- Verification checklist.

## 13. Web Analytics And Attribution

Use authorised web-analytics reporting interface when authorised.

Read where available:

- Users.
- Sessions.
- Engaged sessions.
- Engagement rate.
- Average engagement time.
- Landing pages.
- Page views.
- Traffic source.
- Campaign.
- Device.
- Geography.
- Ecommerce events.
- Add-to-cart.
- Checkout.
- Purchases.
- Revenue.

Do not use “time on website” as a precise fact when only partial browser events exist.

Define a source-of-truth hierarchy:

1. E-commerce Platform completed, non-cancelled orders for commercial truth.
2. E-commerce Platform refunds/cancellations for net result.
3. Consented E-commerce pixel/Web Analytics Platform events for funnel behaviour.
4. Advertising-platform attribution for platform optimisation.
5. Competitor/public data only for market signals.

Preserve platform-reported attribution separately.

Never combine purchases attributed by the Social Advertising Platform and the Search and Video Advertising Platform as though they are deduplicated.

Track:

- Platform attribution window.
- Click-through attribution.
- View-through attribution.
- Web Analytics Platform attribution model.
- E-commerce Platform order timestamp.
- Currency.
- Timezone.
- Conversion lag.

Deduplicate purchases using stable order ID and event ID.

Flag discrepancies such as:

- The Social Advertising Platform reports 100 purchases, but the E-commerce Platform has 63 valid orders.
- The Search and Video Advertising Platform reports clicks, but the Web Analytics Platform has far fewer sessions.
- E-commerce Platform orders lack UTMs.
- Purchase events fire multiple times.
- Refunds remain counted as successful revenue.
- browser and server-side conversion events are duplicated.
- Campaign currency differs from store currency.

## 14. Tracking-Confidence Audit

Before making campaign decisions, calculate a tracking-confidence level:

- HIGH
- MEDIUM
- LOW
- BLOCKED

Check:

- Connector health.
- Data freshness.
- Missing events.
- Duplicate events.
- Currency mismatch.
- Timezone mismatch.
- Attribution mismatch.
- Missing UTMs.
- Missing click IDs.
- Click-to-landing-page discrepancy.
- Platform-purchase-to-E-commerce Platform-order discrepancy.
- Refund/cancellation handling.
- Consent-related loss.
- Webhook failures.
- Broken pages.
- Pixel firing.
- Checkout completion tracking.
- Sample size.
- Conversion delay.

Prohibit financial Social Advertising Platform actions when tracking is BLOCKED.

Require additional caution or approval when confidence is LOW.

## 15. Normalized Data Model

Create structured schemas for:

- Client.
- Business context.
- Connector.
- Advertising account.
- Campaign.
- Ad set/ad group.
- Ad.
- Creative/asset.
- Audience.
- Keyword/search term.
- Placement.
- Device.
- Geography.
- Landing page.
- Product.
- Variant.
- Inventory.
- Session.
- Funnel event.
- Order.
- Refund.
- Cancellation.
- Goal.
- Recommendation.
- Approval.
- Action.
- Experiment.
- Competitor.
- Competitor observation.
- Content observation.
- Creative brief.
- Report.

Every normalized record should preserve:

- Original source.
- Original object ID.
- Raw source reference.
- Retrieved timestamp.
- Metric date.
- Timezone.
- Currency.
- Attribution window.
- Data freshness.
- Confidence.
- Whether it is observed, calculated, estimated or inferred.

Do not discard raw platform data.

## 16. Performance Metric Definitions

Create deterministic calculations for:

CTR = clicks ÷ impressions

Landing-page-view rate = landing-page views ÷ outbound or link clicks

CPC = spend ÷ clicks

CPM = spend ÷ impressions × 1,000

Conversion rate = purchases ÷ qualified sessions

CPA/CAC = spend ÷ valid acquisitions

Platform ROAS = platform-attributed conversion value ÷ platform spend

MER/blended ROAS = E-commerce Platform net revenue ÷ total advertising spend

AOV = net order revenue ÷ valid orders

Refund rate = refunded orders ÷ completed orders

Add-to-cart rate = add-to-cart sessions ÷ product-view sessions

Checkout-start rate = checkout-start sessions ÷ add-to-cart sessions

Checkout-completion rate = valid purchases ÷ checkout-start sessions

Contribution profit =
net revenue
- COGS
- discounts
- refunds
- variable shipping/fulfilment cost
- payment fees
- advertising spend

Break-even CAC must be based on contribution economics, not revenue alone.

Handle division by zero, missing data, currency conversion and timezone boundaries safely.

## 17. Goal-Based Planner

Allow goals such as:

- Revenue target.
- Contribution-profit target.
- Target number of orders.
- Target number of new customers.
- Inventory-clearance target.
- Target ROAS.
- Maximum CAC.
- Fixed-budget profit maximisation.

Collect:

- Goal amount.
- Deadline.
- Budget.
- AOV.
- Gross margin.
- Contribution margin.
- Existing conversion rate.
- Refund/cancellation rate.
- Fulfilment capacity.
- Inventory.
- Geographic constraints.
- Risk tolerance.
- Historical performance.

Calculate:

Required orders = revenue target ÷ expected AOV

Required daily orders = required orders ÷ remaining days

Required sessions = required orders ÷ expected conversion rate

Required advertising spend = required orders × expected CAC

Required daily spend = required advertising spend ÷ remaining days

Required ROAS = revenue target ÷ required spend

Calculate:

- Current run rate.
- Target run rate.
- Gap.
- Conservative scenario.
- Expected scenario.
- Optimistic scenario.
- Probability/confidence where defensible.
- Primary constraint.
- Recommended budget or deadline change.

If the goal is unrealistic, say so clearly and explain with numbers.

## 18. Campaign Decision Engine

Evaluate campaigns, ad sets, ads and creatives.

Classify each as:

- SCALE_CANDIDATE
- MAINTAIN
- OBSERVE
- REPAIR
- REDUCE_CANDIDATE
- PAUSE_CANDIDATE
- REACTIVATE_CANDIDATE
- INSUFFICIENT_DATA
- TRACKING_BLOCKED

Never use one universal ROAS rule for every client.

Base decisions on:

- Business goal.
- Break-even economics.
- Target CAC/ROAS.
- Campaign objective.
- Funnel stage.
- Spend.
- Conversions.
- Conversion lag.
- Learning phase.
- Historical volatility.
- Recent trend.
- Tracking confidence.
- Minimum useful sample.
- Creative fatigue.
- Frequency.
- Audience saturation.
- Inventory.
- Refunds.
- Seasonality.
- Promotions.
- Website changes.
- Day-of-week effects.
- External outages.

Distinguish:

- Statistical signal.
- Normal variance.
- Tracking anomaly.
- Business constraint.
- Diagnostic hypothesis.

## 19. Social Advertising Platform Action Engine

Before proposing a Social Advertising Platform action:

1. Verify connector.
2. Verify fresh data.
3. Verify object identity.
4. Verify current state.
5. Verify tracking confidence.
6. Check learning phase.
7. Check conversion lag.
8. Check minimum-data rule.
9. Check inventory.
10. Check protected-campaign list.
11. Check spend limits.
12. Check pending or recent action cooldown.
13. Check whether the same action was already performed.
14. Calculate financial exposure.
15. Prepare rollback condition.

Action proposal schema must include:

- Proposal ID.
- Client ID.
- Social Advertising Platform account ID.
- Object type.
- Object ID.
- Object name.
- Action.
- Current value/status.
- Proposed value/status.
- Absolute change.
- Percentage change.
- Evidence period.
- Key metrics.
- Business reason.
- Expected benefit.
- Risks.
- Confidence.
- Tracking confidence.
- Maximum exposure.
- Monitoring period.
- Cooldown.
- Rollback condition.
- Approval required.
- Approval expiry.
- Idempotency key.

Do not execute stale approvals.

Immediately before execution, re-read the current Social Advertising Platform object and revalidate the proposal.

After execution:

1. Record service response.
2. Re-read object.
3. Confirm expected state.
4. Save before/after snapshot.
5. Begin monitoring period.
6. Compare outcome with baseline.
7. Roll back only if authorised by policy.
8. Escalate unexpected failures.

## 20. Approval And Autonomy Modes

Support:

### Mode 1 — Read Only

No mutations.

### Mode 2 — Recommend

Create proposals only.

MODE 3 — SUPERVISED Social Advertising Platform execution

Ask for approval for every Social Advertising Platform mutation.

MODE 4 — POLICY-LIMITED Social Advertising Platform AUTONOMY

Automatically execute only actions inside a client-approved policy.

A Social Advertising Platform automatic-action policy must include:

- Allowed accounts.
- Allowed campaign IDs or naming patterns.
- Allowed action types.
- Protected campaigns.
- Maximum percentage budget change per action.
- Maximum currency change per action.
- Maximum cumulative daily budget increase.
- Maximum total daily account budget.
- Maximum total monthly spend.
- Minimum tracking confidence.
- Minimum data requirement.
- Minimum time between changes.
- Learning-phase restrictions.
- Approval exceptions.
- Rollback authority.
- Emergency stop.
- Policy expiry.
- Approver identity.

Default to supervised execution.

Never interpret silence as approval.

## 21. Full Funnel Diagnostics

Analyse:

Ad impression
→ click
→ landing-page view
→ engaged session
→ product view
→ add to cart
→ cart view
→ checkout started
→ checkout progress
→ purchase
→ refund/cancellation
→ repeat purchase where permitted

Use patterns such as:

### High CTR + Low Landing-Page View Rate

Possible:

- Slow page.
- Broken redirect.
- Accidental clicks.
- Weak traffic quality.
- In-app browser issue.
- Tracking problem.

### High Landing-Page Views + Low Engagement

Possible:

- Ad-to-page message mismatch.
- Clickbait creative.
- Weak above-the-fold value proposition.
- Slow mobile experience.
- Wrong audience.
- Price shock.

### Good Product Views + Low Add To Cart

Possible:

- Weak offer.
- Price/value problem.
- Missing reviews.
- Poor product imagery.
- Variant unavailable.
- Unclear size/fit.
- Weak product-market match.

### Good Add To Cart + Low Checkout Start

Possible:

- Shipping surprise.
- Cart error.
- Weak urgency.
- Coupon confusion.
- Unexpected taxes.
- Delivery concerns.

### Good Checkout Start + Low Purchase

Possible:

- Payment failure.
- Missing COD or local payment method.
- Checkout error.
- Shipping restriction.
- Trust issue.
- Forced-account friction.
- Mobile checkout problem.

### Good Purchase Rate + Low Profit

Possible:

- High CAC.
- Low margin.
- Large discounts.
- High refunds.
- Low AOV.
- Expensive fulfilment.
- Wrong product mix.

Every diagnosis must provide:

- Evidence.
- Likely cause.
- Alternative explanations.
- Confidence.
- Missing data.
- Suggested verification.
- Recommended experiment.
- Primary metric.
- Guardrail metric.
- Expected evaluation window.

Never present a hypothesis as a confirmed fact.

## 22. Website And Cro Analysis

When funnel evidence suggests a website problem, inspect the relevant landing/product page using authorised browsing and website-audit tools.

Check:

- Mobile loading speed.
- Broken URL or redirect.
- Message match with ad.
- Above-the-fold clarity.
- Product availability.
- Price match.
- Offer visibility.
- Primary CTA.
- Product images/video.
- Reviews and social proof.
- Shipping clarity.
- Returns.
- Guarantees.
- Payment options.
- COD.
- Trust badges.
- Form friction.
- Checkout errors.
- Mobile layout.
- Accessibility.
- Page hierarchy.

Return:

- Immediate fixes.
- High-impact fixes.
- Hypotheses requiring a test.
- Suggested copy.
- Test design.
- Expected funnel metric affected.

## 23. Competitor Selection

Maintain exactly five competitors.

If the client provides five, validate relevance.

If fewer than five are provided, discover candidates using:

- Product keywords.
- Category keywords.
- Target geography.
- Similar offer.
- Similar customer.
- Search results.
- Public Advertising Library.
- Public social accounts.
- search and video results.
- Authorised competitor-research connectors.

Rank candidate relevance using:

- Same product/problem.
- Same target customer.
- Same price category.
- Same country/market.
- Same traffic source.
- Same ad platform presence.
- Same content format.
- Direct versus indirect competition.

Present the proposed five and require approval before making them the permanent watchlist.

Do not change the watchlist automatically.

## 24. Competitor Monitoring

Default competitor monitoring cadence:

- Quick ad/content scan: weekly.
- Deeper positioning/offer scan: monthly.
- On-demand scan when the user requests it.

For each competitor, collect permitted public observations:

- Brand.
- URL.
- Public social profiles.
- public advertiser profile.
- Active ads.
- Inactive ads where accessible.
- Ad start date.
- Ad end date where visible.
- Days active.
- Creative format.
- Platform placements where visible.
- Ad copy.
- Headline.
- CTA.
- Product.
- Offer.
- Landing-page URL.
- Hook.
- Proof.
- Objection handled.
- Creative variations.
- Public organic videos/content.
- Publication date.
- Publicly visible view count.
- Publicly visible likes/comments.
- Public engagement rate only when defensibly calculable.
- Country/market signals where visible.

Critical truth rules:

- Standard competitor ads do not reliably expose exact views.
- Store competitor ad views as null when unavailable.
- Never estimate missing competitor views and present them as fact.
- Ads running for many days are longevity signals, not proven winners.
- Multiple variations may signal active testing, not profitability.
- Public organic video views do not equal paid-ad performance.
- Never claim competitor ROAS, CAC, purchases, revenue, budget, targeting or profitability without an authorised source that directly provides it.

Label each item as:

- OBSERVED_FACT
- CALCULATED_SIGNAL
- INFERENCE
- UNAVAILABLE

Store source URL and capture date.

## 25. Competitor Snapshots

Persist dated raw competitor snapshots outside the skill:

clients/<client-id>/competitors/
├── <competitor-slug>/
│   ├── 2026-07-01/
│   │   ├── ads.json
│   │   ├── content.json
│   │   ├── landing-pages/
│   │   └── snapshot.json
│   └── 2026-07-08/
└── summary.json

Never overwrite earlier snapshots.

Compare snapshots to detect:

- New ads.
- Removed ads.
- Ads still running.
- New formats.
- New hooks.
- New offers.
- New landing pages.
- New products.
- Messaging changes.
- Content receiving strong visible engagement.
- Increased or decreased creative variation count.

Return the five most relevant findings, not an overwhelming dump.

## 26. Public Content Research

Use authorised search, browsing, crawling or content-research connectors to find relevant:

- public social-network videos.
- public short-form social videos.
- public long-form videos.
- Public short-form video.
- Product demonstrations.
- UGC.
- Founder-led content.
- Review content.
- Educational content.
- Problem/solution content.
- Offer-led content.

Search using:

- Product name.
- Product category.
- Customer problem.
- Desired outcome.
- Competitor brand.
- Competitor product.
- Country/city.
- Relevant language.
- Hook keywords.
- Offer keywords.

Rank content using:

- Relevance to client.
- Recency.
- Visible views where available.
- Visible engagement.
- Comment quality.
- Hook clarity.
- Offer relevance.
- Format transferability.
- Brand suitability.

Do not choose content only because it has a large view count.

Prefer ideas that are relevant, reproducible and aligned with the client’s offer.

## 27. Creative Intelligence

Create a grounded creative corpus using:

- Client’s historical winning ads.
- Client’s losing ads.
- Product data.
- Customer reviews.
- Ad comments.
- Support objections where authorised.
- E-commerce Platform funnel evidence.
- Competitor observations.
- Relevant public content.
- Brand voice.
- Permitted proof points.

Tag every client and competitor creative by:

- Platform.
- Format.
- Length.
- Product.
- Audience.
- Awareness stage.
- Funnel stage.
- Hook.
- Problem.
- Desire.
- Promise.
- Proof.
- Objection.
- Offer.
- CTA.
- Visual style.
- Speaker/creator type.
- Language.
- Market.
- Landing page.

Analyse:

- Winning client patterns.
- Losing client patterns.
- Creative fatigue.
- Hook decay.
- Offer fatigue.
- Audience mismatch.
- Clickbait signals.
- Message-match problems.
- Formats not yet tested.
- Competitor pattern saturation.
- Differentiation opportunities.

## 28. Original Creative Briefs

Generate three to five prioritised original creative briefs per weekly cycle when enough evidence exists.

Each brief must include:

- Brief ID.
- Evidence sources.
- Product.
- Audience.
- Funnel stage.
- Awareness stage.
- Platform.
- Format.
- Duration/dimensions.
- First one-to-three-second hook.
- Main message.
- Product demonstration.
- Proof.
- Objection handling.
- Offer.
- CTA.
- Scene/shot outline.
- Copy or script outline.
- Landing-page requirement.
- Hypothesis.
- Primary success metric.
- Secondary metrics.
- Guardrail metrics.
- Minimum-data requirement.
- What would invalidate the idea.
- Which elements are inspired by market patterns.
- How the idea remains original.

Do not copy:

- Competitor scripts word for word.
- Competitor visual identity.
- Testimonials.
- Statistics.
- Proprietary footage.
- Unsupported claims.

## 29. Experimentation Engine

Maintain an experiment backlog.

Sources:

- Funnel drop-offs.
- Campaign performance.
- Creative fatigue.
- Customer language.
- Reviews.
- Competitor patterns.
- Website audit.
- Previous failed tests.
- Previous winning tests.

Every experiment must contain:

Because [observation/evidence],
we believe [specific change]
will cause [measurable outcome]
for [audience],
while not harming [guardrail metrics].

Store:

- Experiment ID.
- Hypothesis.
- Evidence.
- Variant.
- Control.
- Audience.
- Start date.
- Planned end condition.
- Primary metric.
- Secondary metrics.
- Guardrails.
- Required sample.
- Minimum detectable effect.
- Result.
- Confidence.
- Decision.
- Learning.
- Follow-up.

Do not declare winners early.

Do not learn a permanent rule from an underpowered test.

## 30. Safe Evolution

The agent must evolve through versioned, client-specific learning.

It may learn:

- Normal performance ranges.
- Best-performing products.
- Best creatives.
- Best hooks.
- Best offers.
- Best audiences.
- Strongest locations.
- Best day/time patterns.
- Typical conversion lag.
- Typical refund rate.
- Response to budget increases.
- Response to budget reductions.
- Creative fatigue timing.
- Funnel bottlenecks.
- Seasonal patterns.
- Approved/rejected recommendation patterns.

It must not:

- Rewrite its core safety policy.
- Grant itself additional permissions.
- Increase its own spending limits.
- convert hypotheses into facts.
- Share one client’s data with another.
- modify production code silently.
- learn from insufficient evidence.
- automatically adopt competitor claims.

Store learned rules in a versioned client playbook:

clients/<client-id>/learned-playbook.json

Each learned rule must include:

- Evidence period.
- Supporting observations.
- Confidence.
- Sample size.
- First created.
- Last validated.
- Current status.
- Expiry/review date.
- Human approval when promoted to automatic policy.

## 31. Recurring Loops

Implement these loops:

A. CONNECTOR HEALTH LOOP

Check: hourly or appropriate cadence.

Act when:

- Token expires.
- Sync fails.
- Webhook fails.
- Data becomes stale.

B. TRACKING QUALITY LOOP

Check: daily.

Act when:

- Event volume changes unexpectedly.
- Purchase mismatch exceeds configured tolerance.
- Duplicate events appear.
- UTMs disappear.
- Currency/timezone changes.

C. Social Advertising Platform PERFORMANCE LOOP

Check: daily.

Act only when:

- Action threshold is met.
- Data is sufficient.
- Tracking confidence allows action.
- Cooldown has passed.

D. CREATIVE FATIGUE LOOP

Check: every two to three days.

Act when:

- Frequency increases.
- CTR/CPA deteriorates beyond normal range.
- Spend remains meaningful.
- Tracking remains valid.

E. E-commerce Platform FUNNEL LOOP

Check: daily.

Act when:

- Stage conversion changes materially.
- Checkout failures increase.
- Product inventory changes.
- Refund/cancellation rate rises.

F. COMPETITOR WATCH LOOP

Check: weekly.

Act when:

- New ads/content appear.
- Offer changes.
- Persistent creative pattern emerges.
- A strong relevant public content example appears.

G. WEEKLY STRATEGY LOOP

Check: weekly.

Produce:

- Goal progress.
- Winners.
- Losers.
- Funnel diagnosis.
- Competitor findings.
- Creative briefs.
- Social Advertising Platform developer applicationrovals.
- Search and Video Advertising Platform recommendations.

H. MONTHLY LEARNING LOOP

Check: monthly.

Update:

- Baselines.
- Client playbook.
- Experiment learnings.
- Forecast.
- Competitor summary.

Every loop must define:

- Check cadence.
- Action condition.
- Purpose.
- Inputs.
- Ordered steps.
- Self-check.
- State.
- Idempotency key.
- Cooldown.
- Stop/bail-out condition.
- Error handling.
- Output.
- Human checkpoint.
- Emergency stop behaviour.

Most loop runs should be allowed to return:

“Checked—no action required.”

## 32. Reporting

### Daily Report

Include:

- Date/timezone.
- Data freshness.
- Tracking confidence.
- Spend today/yesterday.
- Valid orders.
- Net revenue.
- Refund/cancellation impact.
- Platform ROAS.
- Blended MER.
- CAC.
- Goal run rate.
- Best campaigns.
- Worst campaigns.
- Anomalies.
- Funnel changes.
- Social Advertising Platform action proposals.
- Search and Video Advertising Platform recommendations.
- Actions executed.
- Actions being monitored.
- Competitor alerts only when material.

### Weekly Report

Include:

- Goal versus actual.
- Required versus actual run rate.
- Spend.
- Net revenue.
- Contribution-profit proxy.
- Orders.
- CAC.
- MER/ROAS.
- Platform comparison.
- Campaign/ad-set/ad winners.
- Creative winners and fatigue.
- Product performance.
- Location/device/placement patterns.
- Funnel-stage conversion.
- Landing-page/CRO findings.
- Five-competitor summary.
- Five most relevant competitor/content examples.
- Three-to-five creative briefs.
- Social Advertising Platform action approvals.
- Search and Video Advertising Platform manual recommendations.
- Experiments.
- Forecast.
- Missing data.

### Monthly Report

Include:

- Goal progress.
- Revenue and profit view.
- Budget efficiency.
- Platform contribution.
- Product contribution.
- Customer acquisition.
- Repeat purchases where authorised.
- Refund/cancellation analysis.
- Historical learning.
- Experiments.
- Creative strategy.
- Competitor shifts.
- Website recommendations.
- Next-month plan.
- Budget allocation.
- Conservative/expected/optimistic forecast.

Every report must distinguish:

- Confirmed fact.
- Calculated result.
- Estimate.
- Hypothesis.
- Recommendation.
- Executed action.
- Data limitation.

## 33. Security And Privacy

Implement:

- Least-privilege access.
- Secure credential storage.
- No credentials in prompts.
- No credentials in reports.
- No credentials in logs.
- Encrypted production storage.
- Tenant isolation.
- Webhook signature validation.
- Token-expiry handling.
- Rate-limit handling.
- Exponential backoff.
- Pagination.
- Idempotent requests.
- Audit logging.
- Data-retention policy.
- Customer deletion support.
- Consent-aware tracking.
- No unnecessary PII.
- No payment-card data.
- Emergency stop.
- Revoked-access detection.

Never upload customer data to an advertising platform without separate explicit authorisation, legal basis and required consent.

## 34. Failure And Degraded Modes

Define behaviour for:

### Social Advertising Platform Only

Analyse Social Advertising Platform. Use platform conversions with lower business-truth confidence.

### Social Advertising Platform + E-commerce Administration

Compare ads with valid orders, but do not claim bounce rate or full visitor journeys.

### Social Advertising Platform + E-commerce Pixel

Perform funnel analysis.

### Social Advertising Platform + E-commerce Platform + Web Analytics Platform

Cross-check sessions and e-commerce events.

### Search and Video Advertising Platform Only

Provide read-only analysis and recommendations.

### No Write Permission

Never attempt mutation. Generate proposals.

### Low Tracking Confidence

Prioritise measurement repair.

### Stale Data

Do not act.

### Token Expired

Stop affected loop and request reconnection.

E-commerce webhook DUPLICATED

Deduplicate using event key.

Social Advertising Platform action FAILS

Record failure, re-read object and escalate.

Social Advertising Platform action PARTIALLY APPLIES

Stop further actions and require review.

### Competitor Source Blocked

Continue first-party analysis and disclose limitation.

### Insufficient Data

Return “observe” and state what sample is needed.

### Inventory Low

Prevent scaling recommendations that exceed fulfilment capacity.

## 35. Test Suite

Create unit tests for:

- Metric calculations.
- Division by zero.
- Currency normalization.
- Timezone normalization.
- Purchase deduplication.
- Webhook deduplication.
- Goal feasibility.
- Break-even CAC.
- Funnel conversion.
- Tracking-confidence classification.
- Campaign classification.
- Approval expiry.
- Idempotency.
- Policy caps.
- Protected campaigns.
- Social Advertising Platform action validation.
- Search and Video Advertising Platform mutation prohibition.
- Competitor fact/inference labels.
- Missing competitor views.
- Experiment sufficiency.
- Rollback conditions.

Create integration tests using mocked connectors.

Required scenarios:

1. Only Social Advertising Platform read access exists.
2. Social Advertising Platform write permission exists but no approval exists.
3. Approved Social Advertising Platform pause.
4. Approved Social Advertising Platform budget increase.
5. Proposed change exceeds policy cap.
6. Campaign is protected.
7. Tracking confidence is blocked.
8. Campaign is in learning phase.
9. Social Advertising Platform reports 100 purchases; E-commerce Platform has 63 valid orders.
10. Ad has high CTR but poor landing-page-view rate.
11. Ad has strong engagement but weak purchases.
12. Campaign has good ROAS but negative contribution profit.
13. Inventory is almost exhausted.
14. Search and Video Advertising Platform campaign should be paused, but Search and Video Advertising Platform is read-only.
15. Legacy video campaign cannot be modified.
16. Competitor ad exposes start date but no views.
17. Public organic video exposes visible views.
18. Competitor watchlist contains more than five brands.
19. Same webhook arrives twice.
20. Same approved action is requested twice.
21. Token expires during execution.
22. connector rate limit is reached.
23. Currency differs across Social Advertising Platform, Search and Video Advertising Platform and E-commerce Platform.
24. Timezones differ.
25. Refunds materially change apparent performance.
26. Unrealistic goal is submitted.
27. Approved change performs poorly and triggers rollback review.
28. One client’s data is requested from another client.
29. Agent tries to create a Search and Video Advertising Platform mutation.
30. Emergency stop is active.

For each test define:

- Inputs.
- Expected behaviour.
- Prohibited behaviour.
- Output.
- Pass/fail criteria.

## 36. Implementation Process

Follow these phases:

### Phase 1 — Orientation

- Inspect the selected reference architecture or internal examples.
- Inspect target framework requirements.
- Verify official integration documentation.
- Define assumptions.
- Identify any true blockers.

### Phase 2 — Design

- Produce architecture.
- Produce capability matrix.
- Produce data model.
- Produce tool contracts.
- Produce action policy.
- Produce runtime requirements.

### Phase 3 — Build

- Initialize the actual skill.
- Create SKILL.md.
- Create references.
- Create scripts.
- Create schemas.
- Create mock fixtures.
- Create tests.

### Phase 4 — Validate

- Validate skill structure.
- Run syntax checks.
- Run schema validation.
- Run unit tests.
- Run integration tests.
- Test dry-run Social Advertising Platform action flow.
- Confirm Search and Video Advertising Platform write actions are impossible.
- Confirm no credentials are present.

### Phase 5 — Forward Test

Test the completed skill against realistic user requests such as:

- “Check the last 30 days and tell me what Social Advertising Platform campaigns should be paused.”
- “We want PKR 10 million in revenue in 60 days. Is it realistic?”
- “Social Advertising Platform says 100 purchases but E-commerce Platform shows 63. What happened?”
- “Increase the winning Social Advertising Platform campaign budget.”
- “Tell me what to change in Search and Video Advertising Platform.”
- “Find and monitor five competitors.”
- “Give me new ad ideas based on our winners and competitor patterns.”
- “Why are users adding to cart but not buying?”

Do not use a live production account for forward testing.

### Phase 6 — Handoff

Return:

- What was built.
- Final skill tree.
- Validation results.
- Test results.
- Supported capabilities.
- Current limitations.
- Required client access.
- Required environment variables.
- E-commerce pixel installation steps.
- Scheduler/runtime requirements.
- How to run in dry-run mode.
- How to enable supervised Social Advertising Platform execution.
- How to activate emergency stop.
- Recommended next implementation phase.

## 37. Definition Of Done

The task is complete only when:

- The actual skill files exist.
- SKILL.md is valid and concise.
- Detailed logic is routed to references.
- Scripts run successfully.
- Schemas validate.
- Tests pass.
- Social Advertising Platform execution is approval/policy gated.
- Social Advertising Platform actions are idempotent and auditable.
- Search and Video Advertising Platform is technically prevented from mutating.
- E-commerce Platform remains read-only.
- Web Pixel tracking plan/code exists.
- Goal planning works.
- Attribution discrepancies are handled.
- Five-competitor monitoring works with mock data.
- Missing competitor views remain null.
- Creative briefs are grounded and original.
- Recurring loops have state and stop conditions.
- Client-specific learning is versioned.
- Cross-client data isolation is tested.
- No secrets exist in the skill.
- The result can run in dry-run mode.
- A clear production deployment checklist is provided.

Do not stop after producing a blueprint.

Proceed from research through implementation, testing, validation and final handoff.

If live credentials are unavailable, complete everything using mock connectors and realistic fixtures. Clearly separate “implemented and tested” from “requires live account verification.”
