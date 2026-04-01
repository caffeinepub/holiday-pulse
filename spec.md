# Holiday Pulse

## Current State
Full-featured travel website with homepage, /admin, /quotation routes. Header has nav links for destinations, Flash Sale, Gallery, Reviews, Videos, Blog, Contact. Version 35 is deployed with all features active.

## Requested Changes (Diff)

### Add
- New `/offer` route: Limited Time Offer landing page optimized for Google Ads campaigns
- `LandingOfferPage.tsx` component with:
  - Minimal distraction-free layout (no full site header/footer clutter — just logo + phone CTA)
  - Hero section: bold headline, urgency subtext ("Limited Seats Available"), countdown timer (48-hour offer)
  - 3 featured deal cards: Andaman 5D/4N, Lakshadweep 4D/3N, North-East 6D/5N — each with price, savings badge, inclusions, and a "Claim This Offer" CTA
  - Trust signals bar: "500+ Happy Clients", "100% Customizable", "24/7 Support", "Instant Confirmation"
  - Simple enquiry form (name, phone, email, preferred destination, travel date) with WhatsApp submit button
  - Social proof: 3 short testimonials with star ratings
  - Footer with contact details only
- Nav link in Header: "🎯 Special Offer" linking to `/offer`

### Modify
- `App.tsx`: Add `offerRoute` and import `LandingOfferPage`
- `Header.tsx`: Add "🎯 Special Offer" nav link

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/LandingOfferPage.tsx` — self-contained, ads-optimized landing page
2. Update `App.tsx` to add the `/offer` route
3. Update `Header.tsx` to add the nav link
