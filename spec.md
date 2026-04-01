# Holiday Pulse

## Current State
Full-featured travel website with packages for Andaman, Lakshadweep, North-East India, and Andaman Cruise. Homepage has: FlashSaleBanner, Header, HeroScene, FlashSaleSection, TripFinder, StatsBar, PackagesSection, GallerySection, FlickerBookSection, ClientsSection (testimonials carousel), WhyChooseSection, ContactSection, Footer.

## Requested Changes (Diff)

### Add
- **Featured Cruise Banner**: A visually striking full-width section placed between FlashSaleSection and TripFinder (or just after PackagesSection). Features the `andaman-featured-cruise-banner.dim_1200x500.jpg` image as background with bold overlay text promoting Andaman Cruise packages (3, 5, 7 nights), key highlights (luxury cabins, shore excursions, all meals), and a prominent "Explore Cruise Packages" CTA button that scrolls to the Cruise tab in PackagesSection.
- **Our Happy Clients Photo Wall**: A new section placed just before ClientsSection (testimonials). Shows a masonry/grid photo wall with 4 real trip photos of happy clients:
  - `/assets/generated/happy-clients-andaman.dim_400x300.jpg` — Andaman group
  - `/assets/generated/happy-clients-lakshadweep.dim_400x300.jpg` — Lakshadweep couple
  - `/assets/generated/happy-clients-northeast.dim_400x300.jpg` — North-East family
  - `/assets/generated/happy-clients-cruise.dim_400x300.jpg` — Cruise deck
  Each photo has a destination label badge overlay and a hover zoom effect. Section heading: "Our Happy Clients".

### Modify
- App.tsx: Add the two new section components (FeaturedCruiseBanner, HappyClientsPhotoWall) in the correct positions.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/FeaturedCruiseBanner.tsx` — full-width banner with background image, gradient overlay, headline, highlights, and CTA button. CTA scrolls to `#packages` and programmatically clicks/activates the Cruise tab.
2. Create `src/frontend/src/components/HappyClientsPhotoWall.tsx` — responsive grid photo wall with 4 images, destination badge overlays, hover zoom, section title "Our Happy Clients".
3. Update `App.tsx` to import and place these two components at the correct positions in the homepage layout.
