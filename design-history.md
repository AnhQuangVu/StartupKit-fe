# DESIGN VERSION LOG

## Version 1.0 — 2026-03-05

**Style:** Clean Minimal (Kickstarter-inspired)

### Sections
- Navbar (fixed 72px, Logo + 5 menu links)
- Hero: Text left + Globe SVG right (pure SVG, no JS lib)
- How It Works: 3 bordered cards
- AI Toolkit: 2-column sticky layout
- Mentor Grid: 3 bordered cards with initials avatar
- Pricing: Free vs Premium (dark card)
- CTA: Dark section with Vietnam Gold button
- Footer: 3-column minimal

### Globe Implementation
- Pure SVG hemisphere with lat/lng ellipses
- Continent simplified paths in #CCCCCC
- Vietnam filled in #F4B400 + concentric pulse rings
- Label badge + dashed connector line
- Fade-in animation via CSS @keyframes

### Typography
- Font: Inter (Google Fonts via next/font)
- H1: 48–56px / 700 / 1.15
- H2: 36–40px / 700 / 1.2
- Body: 15–17px / 400 / 1.65–1.7

### Color
- Black #111111, White #FFFFFF, Gray #F7F7F7/#EAEAEA/#999999
- Vietnam Gold #F4B400 (accent only)

### Deviations
- None. Fully followed design_rule.md and logo_rule.md.

---

## Version 2.0 — 2026-03-05

**Concept Change:** Globe → Full Ecosystem Map (Southeast Asia focus)

### What Changed
- Hero completely redesigned from text+globe split layout to full-width SVG map
- New map concept: Southeast Asia vector map, Vietnam highlighted
- Added EcosystemStats section: 7-category icon grid (Startups, Investors, Accelerators, Coworking, Corporates, Universities, Government)
- Removed: AI Toolkit 2-col section, Mentor Grid section
- Retained: HowItWorks (simplified 3-col), Pricing, CTA, Footer

### Map Implementation (v2)
- **Technology:** Pure SVG, no JS map library (Leaflet/Mapbox/Google Maps not used)
- **Viewbox:** 900×620 covering Southeast Asia mainland + islands
- **Countries rendered:** Myanmar, Thailand, Laos, Cambodia, Vietnam, Malaysia, Indonesia (Sumatra, Java, Borneo), Philippines (Luzon, Visayas, Mindanao), South China
- **Country fill:** #DCDFE8 with 0.8px #BCC0CC stroke
- **Vietnam fill:** #F4B400 with 85% opacity, 1.2px #E5A800 stroke
- **Vietnam marker:** Concentric circles at cx=415 cy=310, r=6/11/17
- **Vietnam badge:** Black rect + yellow label "VIETNAM" + white "500+ Startups", dashed connector
- **City dots:** Hanoi, Ho Chi Minh City, Bangkok, Manila, Kuala Lumpur, Singapore
- **Ocean/bg:** #F0F2F5 with dot grid pattern
- **Animation:** None (text overlay fades via parent; map is static SVG)

### Overlay Text Position
- Centered bottom of map area
- H1: 40–52px, bold, #111111
- Subtext: 17px, #555555
- 2 CTAs: primary (black→gold) + secondary (bordered white)

### EcosystemStats Grid
- 7 columns desktop, 3-4 columns mobile
- Each item: line icon (28px, #111111 stroke), count number (22px bold), label (12px)
- Grid dividers via `gap-px border` overflow-hidden technique (hairline separators)
- Hover state: white→#F7F7F7

### Typography Scale (same as v1)
- H1: 40–52px / 700 / 1.15
- H2: 32–38px / 700 / 1.2
- Body: 14–17px / 400 / 1.65–1.7

### Color (same as v1)
- Black, White, Gray, Vietnam Gold — no gradients, no shadows

### Why Ecosystem Map Approach
- Maps convey "network / ecosystem" concept visually without text
- Southeast Asia context sets the geographic scope clearly
- Vietnam highlight reinforces brand identity as Vietnam-focused platform
- Minimal SVG approach avoids heavy JS dependencies
- Cleaner than hero image or animation-heavy alternatives
