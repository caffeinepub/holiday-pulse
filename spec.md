# Holiday Pulse Andaman Packages

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Travel packages website for Holiday Pulse showcasing Andaman & Nicobar Islands trip packages
- Three packages: 3D/4N (budget), 4D/5N (mid-range), 5D/6N (premium)
- Each package: name, duration, day-by-day itinerary, inclusions, exclusions, highlights/activities, pricing, Book Now/Enquire CTA
- Hero section with 3D animated ocean/wave scene using Three.js + React Three Fiber
- Brand details: Holiday Pulse, contact numbers, email, offices, destination coverage
- Admin management panel to add/edit/remove packages (requires authentication)
- Contact/enquiry section with WhatsApp links

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Package data model (id, name, duration, days, nights, itinerary[], inclusions[], exclusions[], highlights[], price, category, isActive)
2. Backend: CRUD operations for packages with admin role protection
3. Backend: Enquiry submission storage
4. Frontend: Hero section with Three.js animated ocean waves
5. Frontend: Package listing with 3 sections (budget/mid/premium)
6. Frontend: Package detail cards with full itinerary, inclusions, exclusions
7. Frontend: Book Now / Enquire modal with WhatsApp redirect
8. Frontend: Admin management panel (login-gated) to create/edit/delete packages
9. Frontend: Footer with company details, offices, contact info
