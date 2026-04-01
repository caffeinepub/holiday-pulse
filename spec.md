# Holiday Pulse

## Current State
Full-featured travel website with packages for Andaman, Lakshadweep, North-East India, and Andaman Cruise. Features include Flash Sale banner, Featured Cruise Banner, Trip Finder, Weather section, Flicker Book, Happy Clients Photo Wall, Testimonials carousel, WhyChoose, Contact, B2B Quotation page, Admin page, and Yatrik chatbot. App.tsx renders sections in order: HeroScene → FlashSaleSection → FeaturedCruiseBanner → TripFinder → StatsBar → PackagesSection → GallerySection → FlickerBookSection → HappyClientsPhotoWall → ClientsSection → WhyChooseSection → ContactSection.

## Requested Changes (Diff)

### Add
- **VideoTestimonialsSection** component: A visually rich section showcasing 3–4 video testimonials from happy clients. Since we cannot embed real client videos, use YouTube iframe embeds of high-quality travel/tourism testimonial-style videos (public YouTube URLs). Show them in a responsive grid/carousel with client name, destination visited, and a short quote below each video card.
- **TravelBlogSection** component: A travel blog/guides section with 6 static article cards covering topics like "Best Time to Visit Andaman", "Complete Lakshadweep Travel Guide", "Top Things to Do in North-East India", "Andaman Cruise: What to Expect", "Andaman on a Budget", "Hidden Gems of Lakshadweep". Each card shows: cover image (use gradient + emoji placeholder), title, excerpt (2-3 sentences), read time, destination tag, and a "Read More" button that opens a modal with the full article content. This boosts SEO with keyword-rich content.
- Add **"📹 Videos"** nav link in Header pointing to `#video-testimonials`
- Add **"📖 Blog"** nav link in Header pointing to `#travel-blog`

### Modify
- **App.tsx**: Insert `<VideoTestimonialsSection />` after `<HappyClientsPhotoWall />` and before `<ClientsSection />`. Insert `<TravelBlogSection />` after `<WhyChooseSection />` and before `<ContactSection />`.
- **Header.tsx**: Add "📹 Videos" and "📖 Blog" nav links to the navLinks array.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/VideoTestimonialsSection.tsx` with 4 YouTube video embeds in a responsive 2x2 grid, each with a card wrapper, client name, destination badge, and short quote.
2. Create `src/frontend/src/components/TravelBlogSection.tsx` with 6 article cards in a 3-column grid (2 on tablet, 1 on mobile), with a modal for full article content.
3. Update `App.tsx` to import and render both new sections.
4. Update `Header.tsx` navLinks to include the two new nav items.
