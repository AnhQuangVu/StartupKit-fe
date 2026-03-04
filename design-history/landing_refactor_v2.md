# Landing Page Refactor v2 — Platform v3 Alignment

**Date:** 2026-03-05
**Scope:** Structural extension of existing landing page. No redesign.

---

## What Was Added

### 1. AI Tagline (EcosystemMapHero)
> "AI-driven matching between Startups, Mentors and Investors across Vietnam."

Positioned between the H1 underline accent and the subtext.
**Supports:** AI Matching Engine system requirement. Sets user expectation immediately.

---

### 2. EcosystemStats — Scale Row
Added 3-col block below the icon grid:
- **10,000+ Startup Profiles** — infrastructure capacity
- **500 Concurrent Users** — performance spec
- **100% Vietnam-Focused** — network identity

**Supports:** Platform scalability requirement from system document.

---

### 3. RoleEcosystem Section
Three bordered cards: Startup / Mentor / Investor.
Each card: tagline, 3 feature bullets, CTA link with `?role=` param.

**Business logic alignment:**
- Startup → AI profile + 10% fee model
- Mentor → Session booking + Credibility Score
- Investor → Deal flow + AI filtering

---

### 4. AIPitchBuilder Section
Two-column layout: sticky description left + vertical 4-step flow right.

Flow: `Startup Input → AI Engine → Investment Profile → Investor Dashboard`

**Supports:** Core AI Pitch Deck Builder feature. Explains how unstructured data becomes structured investor-ready content.

---

### 5. MatchingEngine Section
Three-node vertical diagram (Startup → AI Engine → Mentor/Investor).
Three matching rules with numbered list.

Rules:
1. Auto-match by industry
2. Auto-match by funding stage
3. Admin intervenes only in disputes

**Supports:** Algorithmic Matching Engine with Admin oversight model.

---

### 6. CredibilityScore Section
SVG ring gauge (demo: 74/100) + weight bars.
Three signal sources:
- Reviews (35%)
- Completed Sessions (35%)
- Successful Deals (30%)

**Supports:** Dynamic Credibility Score replacing static ranking. Aligns with trust-based ecosystem model.

---

### 7. BusinessModel Section
Free vs Premium tier cards.
10% Success Fee info box (subtle, not aggressive).

**Supports:** Revenue model with success-aligned incentives. Clear that fee only applies post-disbursement.

---

## What Was Not Changed
- Hero layout and world map background
- Vietnam highlight (#F4B400)
- Logo position in Navbar
- HowItWorks section
- CTASection
- Footer structure
- Color palette

## Design Rules Compliance
- No gradients introduced
- No new colors (only black, white, gray, #F4B400)
- All sections use 1px border (#EAEAEA) and border-radius 8px
- Max content width 1200px maintained
- Clean minimal SaaS tone throughout
