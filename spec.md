# Holiday Pulse

## Current State
A `HeroIconBar` component sits below the hero section as a collapsible bar. It shows a collapsed peek row (dots + caret) by default and expands on hover/tap to reveal the 8 quick-link icon cards. The bar expands downward and takes up vertical space.

## Requested Changes (Diff)

### Add
- A new **floating vertical speed-dial** on the right side of the page (fixed position, mid-screen vertically).
- The dial has a single **toggle button** (e.g. a compass/menu icon) that is always visible.
- On hover (desktop) or tap (mobile), the **individual icon buttons shoot outward** to the left with a staggered spring animation — one at a time, not all at once.
- Each icon pill shows an **icon + label** that slides out smoothly and does NOT overlap any content (fixed position, over viewport, high z-index).
- Icons to include (12 total):
  1. Explore Packages → scroll to #packages
  2. Cruise Packages → scroll to cruise tab
  3. Contact Us → scroll to #contact
  4. Chat Now → opens Yatrik chatbot
  5. Plan My Trip → scroll to #trip-finder
  6. Flash Sale → scroll to #flash-sale
  7. Special Offer → /offer page
  8. Refer & Earn → scroll to #refer-earn
  9. Gallery → scroll to #gallery
  10. Reviews → scroll to #reviews
  11. Videos → scroll to #video-testimonials
  12. Blog → scroll to #travel-blog
- Each item: icon (emoji or image) + label, shoots to the left, collapses back on mouse leave / second tap.
- No overlap with existing content.
- Clean, not clumsy — icons shoot out one at a time with a stagger, collapse cleanly.

### Modify
- Replace the current `HeroIconBar` collapsible bar with the new vertical speed-dial sidebar.
- Remove the old `HeroIconBar` from `App.tsx` and `HeroScene.tsx`; replace with new `FloatingIconDial` component.

### Remove
- Old `HeroIconBar` collapse/expand bar that takes up document flow space below the hero.

## Implementation Plan
1. Create `FloatingIconDial.tsx` — a fixed right-side vertical speed-dial with staggered shoot-out animation using framer-motion.
2. Update `HeroScene.tsx` — remove `HeroIconBar` export (or keep but unused).
3. Update `App.tsx` — replace `<HeroIconBar />` with `<FloatingIconDial />`.
4. Ensure z-index doesn't conflict with chatbot (bottom-right), WhatsApp CTA, or flash sale banner.
5. Validate and build.
