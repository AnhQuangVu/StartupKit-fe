# 💰 StartupKit Billing System Design

**Status**: 🔴 NOT IMPLEMENTED
**Priority**: CRITICAL - Required for MVP
**Date**: 2025-03-23

---

## Executive Summary

Current database schema **completely lacks** billing infrastructure:
- ❌ No payment tracking
- ❌ No subscription management
- ❌ No transaction history
- ❌ No mentor payout system
- ❌ No invoicing mechanism

**Impact**: Cannot monetize platform, cannot charge users, cannot pay mentors.

---

## Table of Contents

1. [Business Model](#business-model)
2. [Database Schema](#database-schema)
3. [Data Flow Examples](#data-flow-examples)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Risk Analysis](#risk-analysis)

---

## Business Model

### Revenue Streams

```
┌─────────────────────────────────────────────────────────────┐
│                    STARTUPKIT REVENUE FLOWS                 │
├─────────────────────────────────────────────────────────────┤

1. SUBSCRIPTION (SaaS Model)
   ├─ Target: Startups & Investors
   ├─ Free Tier: GUEST users (limited)
   ├─ Starter: $10/month (5 projects, basic features)
   ├─ Business: $50/month (unlimited projects, priority support)
   └─ Enterprise: Custom pricing (API access, white-label)

2. MENTOR COMMISSION (Usage-Based)
   ├─ Transaction: Startup books mentor session
   ├─ Startup pays: $X (mentor's hourly_rate × duration)
   ├─ Platform fee: 20-30% of transaction
   ├─ Mentor payout: 70-80% net (weekly/monthly batches)
   └─ Example: $50 session → Platform $10, Mentor $40

3. DEAL ROOM FEATURES (Premium)
   ├─ Basic deal room: Free with subscription
   ├─ Advanced analytics: +$20/month
   ├─ Extended document storage: +$10/month
   └─ Priority investor notifications: +$5/month

4. API ACCESS (For integrations)
   ├─ Free: 1,000 API calls/month
   ├─ Growth: 10,000 calls/month - $50/month
   └─ Enterprise: Unlimited - Custom pricing

└─────────────────────────────────────────────────────────────┘
```

### Pricing Tiers

| Feature | Free | Starter | Business | Enterprise |
|---------|------|---------|----------|-----------|
| **Monthly Cost** | $0 | $10 | $50 | Custom |
| **Max Projects** | 1 | 5 | ∞ | ∞ |
| **Messages/month** | 50 | 500 | ∞ | ∞ |
| **Mentor Sessions/month** | 2 | 20 | ∞ | ∞ |
| **Team Members** | 1 | 5 | ∞ | ∞ |
| **API Calls/day** | 100 | 1,000 | 10,000 | Custom |
| **Support** | Community | Email | Priority | Dedicated |
| **Analytics** | Basic | Standard | Advanced | Custom |

---

## Database Schema

### 1. `subscription_plans` - Product Catalog

```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL UNIQUE,
    tier VARCHAR(32) NOT NULL,
    -- Values: FREE, STARTER, BUSINESS, ENTERPRISE

    -- Pricing (in USD)
    monthly_price NUMERIC(10, 2),
    annual_price NUMERIC(10, 2),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',

    -- Feature quotas stored as JSON
    features JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Schema example:
    -- {
    --   "max_projects": 5,
    --   "max_messages_per_month": 500,
    --   "max_sessions_per_month": 20,
    --   "team_members": 5,
    --   "api_calls_per_day": 1000,
    --   "priority_support": false,
    --   "advanced_analytics": false
    -- }

    -- Stripe integration
    stripe_product_id VARCHAR(255),
    stripe_price_monthly VARCHAR(255),
    stripe_price_annual VARCHAR(255),

    -- UI & Metadata
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscription_plans_tier ON subscription_plans(tier);
CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active);
CREATE UNIQUE INDEX idx_subscription_plans_stripe_product
  ON subscription_plans(stripe_product_id)
  WHERE stripe_product_id IS NOT NULL;
```

---

### 2. `user_subscriptions` - Active Subscriptions

```sql
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),

    -- ============ Status Management ============
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    -- Values: ACTIVE, CANCELLED, PAUSED, PAST_DUE, PAYMENT_FAILED
    -- ACTIVE: Paying normally
    -- CANCELLED: User ended subscription
    -- PAUSED: Temporary hold (grace period)
    -- PAST_DUE: Failed payment, retrying
    -- PAYMENT_FAILED: Multiple retries exhausted

    cancel_reason VARCHAR(255),

    -- ============ Billing Period ============
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,

    -- If user requested cancellation at end of period
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    will_cancel_at TIMESTAMPTZ,

    -- ============ Stripe References ============
    stripe_subscription_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    stripe_default_payment_method_id VARCHAR(255),

    -- ============ Payment History ============
    last_payment_status VARCHAR(32),
    -- Values: SUCCEEDED, FAILED, PENDING
    last_payment_at TIMESTAMPTZ,
    consecutive_payment_failures INTEGER DEFAULT 0,

    -- ============ Audit ============
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,

    -- Ensure only one active subscription per user
    CONSTRAINT uq_user_active_subscription UNIQUE (user_id)
      WHERE status IN ('ACTIVE', 'PAUSED')
);

CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_period_end ON user_subscriptions(current_period_end);
CREATE INDEX idx_user_subscriptions_stripe ON user_subscriptions(stripe_subscription_id);
CREATE INDEX idx_user_subscriptions_past_due
  ON user_subscriptions(status, last_payment_at)
  WHERE status IN ('PAST_DUE', 'PAYMENT_FAILED');
```

---

### 3. `transactions` - All Money Flow

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- ============ Parties ============
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    -- User being charged or receiving credit

    related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    -- For mentor payouts: mentor receiving money
    -- For refunds: who issued the refund

    -- ============ Money Details ============
    type VARCHAR(32) NOT NULL,
    -- Values:
    --   SUBSCRIPTION (monthly/annual charge)
    --   MENTOR_SESSION (mentor service)
    --   DEAL_FEE (commission on deal)
    --   DEAL_ROOM_UPGRADE (premium feature)
    --   API_OVERAGE (excess API calls)
    --   REFUND (money back)
    --   ADJUSTMENT (manual correction)
    --   MENTOR_PAYOUT (paying mentor)
    --   PLATFORM_FEE (internal tracking)

    amount_cents BIGINT NOT NULL,
    -- Always store as cents to avoid float precision issues
    -- Example: $25.50 = 2550 cents

    currency VARCHAR(10) NOT NULL DEFAULT 'USD',

    -- ============ Fee Breakdown ============
    platform_fee_cents BIGINT,
    -- How much platform keeps

    provider_payout_cents BIGINT,
    -- How much goes to mentor/service provider
    -- invariant: amount_cents = platform_fee_cents + provider_payout_cents

    -- ============ Status & Results ============
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    -- Values: PENDING, COMPLETED, FAILED, REFUNDED, DISPUTED

    failure_reason TEXT,
    -- Why payment failed (if status=FAILED)
    -- Examples: "Card declined", "Insufficient funds", "Expired card"

    -- ============ Linking to Sources ============
    subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE SET NULL,
    mentor_session_id UUID REFERENCES mentor_sessions(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,

    -- ============ Stripe Tracking ============
    stripe_charge_id VARCHAR(255),
    stripe_invoice_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),

    -- ============ Record Keeping ============
    description TEXT,
    -- Human-readable description
    -- Example: "Mentor session: Growth Marketing (30 min)"

    idempotency_key VARCHAR(255) UNIQUE,
    -- Prevent duplicate charges (Stripe webhook retries)

    -- ============ Audit ============
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT chk_transaction_amount_positive CHECK (amount_cents > 0),
    CONSTRAINT chk_fee_breakdown
      CHECK (platform_fee_cents IS NULL
             OR provider_payout_cents IS NULL
             OR (platform_fee_cents + provider_payout_cents = amount_cents))
);

-- Indexes for common queries
CREATE INDEX idx_transactions_user_status
  ON transactions(user_id, status);
CREATE INDEX idx_transactions_related_user
  ON transactions(related_user_id);
CREATE INDEX idx_transactions_created
  ON transactions(created_at DESC);
CREATE INDEX idx_transactions_type_status
  ON transactions(type, status);
CREATE INDEX idx_transactions_session_id
  ON transactions(mentor_session_id);
CREATE INDEX idx_transactions_deal_id
  ON transactions(deal_id);
CREATE INDEX idx_transactions_stripe_charge
  ON transactions(stripe_charge_id);
CREATE INDEX idx_transactions_idempotency
  ON transactions(idempotency_key);

-- Partitioning for scalability: monthly partitions
-- CREATE TABLE transactions_2025_03
--   PARTITION OF transactions FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');
```

---

### 4. `mentor_session_payments` - Mentor Payouts

```sql
CREATE TABLE mentor_session_payments (
    session_id UUID PRIMARY KEY REFERENCES mentor_sessions(id) ON DELETE CASCADE,

    -- ============ Who Gets Paid ============
    mentor_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- ============ Financial Calculation ============
    -- Given: mentor.hourly_rate = $50 and session.duration_min = 30
    -- session_rate_cents = 50 * (30 / 60) * 100 = 2500 cents = $25

    session_rate_cents BIGINT NOT NULL,
    -- Gross amount (what startup paid)

    platform_fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 20.00,
    -- Platform commission percentage (e.g., 20%)

    platform_fee_cents BIGINT NOT NULL,
    -- Calculated: session_rate_cents * (platform_fee_percent / 100)

    mentor_payout_cents BIGINT NOT NULL,
    -- Net for mentor: session_rate_cents - platform_fee_cents

    -- ============ Payout Status ============
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    -- Values:
    --   PENDING: awaiting payout batch
    --   SCHEDULED: included in this week's payout
    --   PAID: successfully paid to mentor
    --   FAILED: payout failed, retry scheduled
    --   CANCELLED: refunded, no payout

    payout_method VARCHAR(32),
    -- STRIPE_CONNECTED_ACCOUNT, BANK_TRANSFER, PAYPAL

    paid_at TIMESTAMPTZ,

    -- ============ Stripe Tracking ============
    stripe_payout_id VARCHAR(255),
    -- Reference to Stripe Connect payout object

    -- ============ Audit ============
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Invariant: mentor gets paid positive amount
    CONSTRAINT chk_mentor_payout_positive
      CHECK (mentor_payout_cents > 0),
    -- Platform fee should be reasonable (1-100%)
    CONSTRAINT chk_platform_fee_reasonable
      CHECK (platform_fee_percent > 0 AND platform_fee_percent < 100)
);

CREATE INDEX idx_mentor_payments_mentor_status
  ON mentor_session_payments(mentor_user_id, status);
CREATE INDEX idx_mentor_payments_paid_at
  ON mentor_session_payments(paid_at DESC);
CREATE INDEX idx_mentor_payments_status
  ON mentor_session_payments(status);
CREATE INDEX idx_mentor_payments_pending
  ON mentor_session_payments(created_at)
  WHERE status = 'PENDING';
```

---

### 5. `invoices` - Invoice Records

```sql
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- ============ Invoice Identification ============
    invoice_number VARCHAR(32) NOT NULL UNIQUE,
    -- Format: INV-YYYY-MM-XXXXX (e.g., INV-2025-03-00001)

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,

    -- ============ Billing Period ============
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,

    -- ============ Amounts (all in cents) ============
    subtotal_cents BIGINT NOT NULL,
    -- Sum of all line items

    discount_cents BIGINT NOT NULL DEFAULT 0,
    -- Promotional discount or credit applied

    tax_cents BIGINT NOT NULL DEFAULT 0,
    -- Sales tax, VAT, GST (calculated based on user location)

    total_cents BIGINT NOT NULL,
    -- subtotal - discount + tax

    -- ============ Payment Status ============
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
    -- Values:
    --   DRAFT: preparing, not sent
    --   SENT: emailed to user, awaiting payment
    --   OVERDUE: past due_date, payment not received
    --   PAID: payment received
    --   FAILED: payment attempt failed
    --   CANCELLED: invoice voided (refund issued)

    due_date DATE NOT NULL,

    -- ============ Payment Method ============
    payment_method_used VARCHAR(32),
    -- CREDIT_CARD, BANK_TRANSFER, etc

    -- ============ Stripe References ============
    stripe_invoice_id VARCHAR(255),

    -- ============ Metadata ============
    notes TEXT,
    custom_message TEXT,

    -- ============ Audit ============
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,

    -- Constraint: total must be positive
    CONSTRAINT chk_invoice_total CHECK (total_cents >= 0)
);

CREATE INDEX idx_invoices_user_status
  ON invoices(user_id, status);
CREATE INDEX idx_invoices_created
  ON invoices(created_at DESC);
CREATE INDEX idx_invoices_due_date
  ON invoices(due_date);
CREATE INDEX idx_invoices_status_overdue
  ON invoices(due_date)
  WHERE status IN ('SENT', 'OVERDUE');
CREATE UNIQUE INDEX idx_invoices_stripe
  ON invoices(stripe_invoice_id)
  WHERE stripe_invoice_id IS NOT NULL;
```

---

### 6. `payment_methods` - Stored Payment Info

```sql
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- ============ Stripe Reference ============
    -- DO NOT STORE CARD NUMBERS LOCALLY FOR PCI COMPLIANCE
    stripe_payment_method_id VARCHAR(255) NOT NULL UNIQUE,

    -- ============ Card Details (from Stripe) ============
    card_last_four VARCHAR(4),
    card_brand VARCHAR(32),
    -- VISA, MASTERCARD, AMEX, DISCOVER, etc

    card_exp_month INTEGER,
    card_exp_year INTEGER,

    -- ============ Status ============
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    -- Only one payment method per user can be default

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- Soft delete (user removed card but keep history)

    -- ============ Audit ============
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraint: only one default per user
    CONSTRAINT uq_user_default_payment_method
      UNIQUE (user_id)
      WHERE is_default = TRUE
);

CREATE INDEX idx_payment_methods_user_default
  ON payment_methods(user_id, is_default);
CREATE INDEX idx_payment_methods_user_active
  ON payment_methods(user_id, is_active);
CREATE UNIQUE INDEX idx_payment_methods_stripe
  ON payment_methods(stripe_payment_method_id);
```

---

## Data Flow Examples

### Flow 1: Startup Subscribes to Business Plan

```
Day 1: Startup registers
├─ user_id = 'startup-abc123'
├─ role_code = STARTUP
└─ Initial: FREE tier subscription

Day 1.5: User upgrades to BUSINESS plan ($50/month)
├─ 1. Create/update payment method
│  └─ INSERT payment_methods (stripe_payment_method_id: 'pm_xxx')
│
├─ 2. Create Stripe subscription
│  ├─ Call: stripe.subscriptions.create({
│  │   customer: 'cus_xxx',
│  │   price: 'price_business_monthly',
│  │   payment_method: 'pm_xxx',
│  │   default_mandate_data: {...}
│  │ })
│  └─ Returns: stripe_subscription_id='sub_123abc'
│
├─ 3. Insert into user_subscriptions
│  └─ INSERT user_subscriptions (
│       user_id: 'startup-abc123',
│       plan_id: (SELECT id FROM subscription_plans WHERE tier='BUSINESS'),
│       status: 'ACTIVE',
│       current_period_start: NOW(),
│       current_period_end: NOW() + INTERVAL '1 month',
│       stripe_subscription_id: 'sub_123abc'
│     )
│
└─ 4. Stripe fires webhook: invoice.payment_succeeded
   └─ 4a. INSERT transactions (
          user_id: 'startup-abc123',
          type: 'SUBSCRIPTION',
          amount_cents: 5000,
          status: 'COMPLETED',
          stripe_charge_id: 'ch_xxx',
          stripe_invoice_id: 'in_xxx'
        )
      4b. Auto-generate invoice entry
          INSERT invoices (
            user_id: 'startup-abc123',
            billing_period_start: NOW(),
            billing_period_end: NOW() + INTERVAL '1 month',
            subtotal_cents: 5000,
            total_cents: 5000,
            status: 'PAID',
            stripe_invoice_id: 'in_xxx'
          )

Result: Startup now has ACTIVE Business subscription
        Next charge: automatically on period_end (1 month later)
```

---

### Flow 2: Mentor Session Booking & Payout

```
Day 1: Startup books mentor session (30 min, mentor hourly_rate = $50)
├─ Startup calls: POST /mentor/sessions/book
├─ Backend calculates: session_rate = $50 × (30/60) = $25
│
├─ 1. Charge startup immediately (if not subscribed, charge as PAYG)
│  └─ INSERT transactions (
│       user_id: 'startup-abc123',
│       type: 'MENTOR_SESSION',
│       amount_cents: 2500,
│       related_user_id: 'mentor-xyz789',
│       mentor_session_id: 'sess-123',
│       platform_fee_cents: 500,        -- 20% fee
│       provider_payout_cents: 2000,    -- mentor gets 80%
│       status: 'PENDING'  (awaiting payment processing)
│     )
│
├─ 2. Create mentor payout record
│  └─ INSERT mentor_session_payments (
│       session_id: 'sess-123',
│       mentor_user_id: 'mentor-xyz789',
│       session_rate_cents: 2500,
│       platform_fee_percent: 20,
│       platform_fee_cents: 500,
│       mentor_payout_cents: 2000,
│       status: 'PENDING'
│     )
│
├─ 3. Stripe processes charge
│  └─ stripe.charges.create({
│       customer: 'cus_startup_xxx',
│       amount: 2500,
│       currency: 'usd',
│       description: 'Mentor session: Growth (30 min) with John Doe'
│     })
│
└─ 4. Webhook: charge.succeeded
   └─ UPDATE transactions SET status='COMPLETED' WHERE stripe_charge_id='ch_xxx'
      UPDATE mentor_session_payments SET status='SCHEDULED'

Day 7: Weekly payout batch runs (Friday 5 PM)
├─ Query all PENDING mentor payouts older than 3 days
├─ 1. Aggregate by mentor:
│  └─ SELECT mentor_user_id, SUM(mentor_payout_cents)
│       FROM mentor_session_payments
│       WHERE status='PENDING' AND created_at < NOW() - INTERVAL '3 days'
│       GROUP BY mentor_user_id
│
├─ 2. For each mentor, create Stripe Connect payout:
│  ├─ mentor-xyz789: $2000 due
│  ├─ Call: stripe.payouts.create({
│  │   connected_account: 'acct_mentor_xyz789',
│  │   amount: 2000,
│  │   currency: 'USD',
│  │   method: 'instant'  (or 'standard' for next day)
│  │ })
│  └─ Returns: payout_id='po_1234567890'
│
├─ 3. Update payout records:
│  └─ UPDATE mentor_session_payments
│       SET status='PAID',
│           stripe_payout_id='po_1234567890',
│           paid_at=NOW()
│       WHERE mentor_user_id='mentor-xyz789'
│             AND status='PENDING'
│
└─ Mentor receives $2000 in their bank account in ~1-2 business days
   Platform keeps $500 (20% commission)
```

---

### Flow 3: Monthly Invoice Generation

```
Day 1 of month: Automatic invoice generation job runs

For each user_id with ACTIVE subscription:
├─ 1. Fetch this month's transactions:
│  └─ SELECT * FROM transactions
│       WHERE user_id='user-123'
│       AND created_at BETWEEN billing_period_start AND billing_period_end
│
├─ 2. Calculate totals:
│  ├─ subscription_charge = (looked up from plan pricing)
│  ├─ mentor_sessions = SUM(amount_cents) WHERE type='MENTOR_SESSION'
│  ├─ add_ons = SUM(amount_cents) WHERE type='DEAL_ROOM_UPGRADE'
│  ├─ api_overage = calculated from usage
│  ├─ subtotal = subscription_charge + mentor_sessions + add_ons + api_overage
│  ├─ discount = any promo codes applied
│  ├─ tax = subtotal × state_tax_rate (or VAT)
│  └─ total = subtotal - discount + tax
│
├─ 3. Create invoice record:
│  └─ INSERT invoices (
│       invoice_number: 'INV-2025-03-00001',
│       user_id: 'user-123',
│       billing_period_start: '2025-03-01',
│       billing_period_end: '2025-03-31',
│       subtotal_cents: 10500,
│       tax_cents: 800,
│       total_cents: 11300,
│       status: 'DRAFT'
│     )
│
├─ 4. Email invoice to user:
│  └─ Send: "Your invoice for March is ready"
│       Link: https://startupkit.com/invoices/inv-123
│
├─ 5. Update payment status:
│  └─ UPDATE invoices SET status='SENT' WHERE id='inv-123'
│
└─ User can download PDF, or auto-charge happens at due_date

If payment fails on due_date:
├─ Retry 3 times over 5 days (with exponential backoff)
├─ If all retries fail:
│  ├─ UPDATE user_subscriptions SET status='PAST_DUE'
│  ├─ Send email: "Payment failed. Update payment method."
│  ├─ Limit API access until resolved
│  └─ After 30 days: UPDATE status='CANCELLED'
```

---

## Implementation Roadmap

### Phase 1: Database & Backend (Week 1-2)

- [ ] Create 6 billing tables in PostgreSQL
- [ ] Add Stripe secrets to environment variables
- [ ] Initialize Stripe SDK (Node.js backend)
- [ ] Create API endpoints:
  - [ ] POST `/billing/subscribe` - Create subscription
  - [ ] POST `/billing/payment-methods` - Add card
  - [ ] DELETE `/billing/payment-methods/:id` - Remove card
  - [ ] GET `/billing/invoices` - List invoices
  - [ ] GET `/billing/invoices/:id/pdf` - Download PDF

### Phase 2: Webhooks & Automation (Week 2-3)

- [ ] Setup Stripe webhook endpoint `/webhooks/stripe`
- [ ] Handle events:
  - [ ] `invoice.payment_succeeded` - Transaction + Invoice
  - [ ] `invoice.payment_failed` - Retry logic
  - [ ] `customer.subscription.updated` - Plan changes
  - [ ] `customer.subscription.deleted` - Cancellation
- [ ] Implement retry logic for failed payments
- [ ] Setup weekly payout batch job for mentors

### Phase 3: Frontend (Week 3-4)

- [ ] Subscription management page
  - [ ] Current plan display
  - [ ] Upgrade/downgrade buttons
  - [ ] Payment method management (add/remove)
- [ ] Invoice history page
  - [ ] List invoices with status
  - [ ] PDF download
  - [ ] Email resend option
- [ ] Billing dashboard for admins
  - [ ] Revenue chart
  - [ ] Failed payment alerts
  - [ ] Payout status

### Phase 4: Testing & Compliance (Week 4)

- [ ] Stripe test mode integration testing
- [ ] PCI compliance audit
- [ ] Tax calculation verification
- [ ] Payout calculation accuracy
- [ ] Refund handling tests

---

## Risk Analysis

### 🔴 Critical Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Payment processing fails silently | Revenue loss, mentor payouts missed | Comprehensive logging + alerts |
| Double-charging users | Customer loss, chargebacks | Idempotency keys, transaction record check |
| Stripe webhook delivery issues | Inconsistent state | Reconciliation job runs nightly |
| Incorrect tax calculation | Legal compliance issues | Verified tax library, audit trail |
| Mentor payout errors | Legal disputes, trust loss | Manual review before payout batches |

### 🟡 Medium Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Card expiry during billing cycle | Payment failures | Stripe auto-updates stored payment methods |
| Concurrency issues with transactions | Data corruption | Use BEGIN...COMMIT, proper locking |
| Message_reads table bloat | Query slowdown | Implement aggregation separate table |

### 🟢 Low Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Invoice number collisions | Duplicate records | Use UUID + sequence number |
| Timezone issues | Incorrect billing dates | Store all times as UTC |

---

## Required External Services

### Stripe Account Setup

1. **Stripe Dashboard**
   - [ ] Create Stripe account
   - [ ] Add products (Free, Starter, Business, Enterprise)
   - [ ] Create prices (monthly & annual)
   - [ ] Setup Stripe Connect for mentor payouts
   - [ ] Add webhook endpoint
   - [ ] Get API keys (public + secret)

2. **Stripe Settings**
   - [ ] Enable SCA (3D Secure) for EU compliance
   - [ ] Set default payment retry rules (3 attempts)
   - [ ] Configure webhook signing secret
   - [ ] Test mode prefix: `sk_test_xxx` and `pk_test_xxx`

### Tax Configuration

- [ ] Stripe Tax API setup (for VAT/GST)
- [ ] US state sales tax rates (if targeting US)
- [ ] Vietnam GST rate: 10%

---

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Subscription adoption | 20% of signups | Month 2 |
| Successful payment rate | >98% | Day 1 |
| Mentor payout satisfaction | >95% timely | Week 1 |
| Failed payment recovery | >70% after retry | Week 2 |
| Monthly Recurring Revenue (MRR) | $5,000+ | Month 3 |

---

## Questions to Product/Finance

1. **Pricing**: Are these price points final or TBD?
2. **Platform fee**: Should it be 20% for mentors or different?
3. **Trial period**: Should new users get 14-day free trial?
4. **Discount codes**: Support promo codes? Affiliate program?
5. **Invoicing**: Should invoices be auto-generated or manual approval?
6. **Tax**: Who handles tax collection? (Stripe Tax API recommended)
7. **Refunds**: What's refund policy if user cancels mid-month?
8. **International**: Support multiple currencies beyond USD?

---

## Appendix: SQL to Deploy

Save as `migrations/001_billing_system.sql`:

```sql
-- Create all 6 tables with proper constraints and indexes
-- (See sections above for full CREATE TABLE statements)
-- Run this after backing up production database!

-- Then run data migration (if any existing data):
-- INSERT INTO subscription_plans (...) VALUES (...)
-- UPDATE users SET ... (default subscriptions)
```

Deploy steps:
```bash
# 1. Backup database
pg_dump startupkit_db > backup_2025-03-23.sql

# 2. Run migration
psql startupkit_db < migrations/001_billing_system.sql

# 3. Verify tables created
psql startupkit_db -c "\dt" | grep subscription_plans

# 4. Deploy backend code
npm run build && npm start
```

---

**Last Updated**: 2025-03-23
**Prepared by**: Claude Code
**Status**: Ready for implementation pending approval
