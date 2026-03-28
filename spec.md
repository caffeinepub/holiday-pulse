# Holiday Pulse

## Current State
- Full travel website with 3 destinations: Andaman, Lakshadweep, North-East India
- 3 packages per destination
- Floating chatbot (ChatbotWidget.tsx) with limited language support (6 languages)
- Admin panel at /admin
- Hero section, package cards, enquiry modal with WhatsApp integration
- Footer with www.holidaypulse.ind branding

## Requested Changes (Diff)

### Add
- Rename chatbot to "DARLING" (displayed as bot name in chat UI)
- Expand language support to all major world languages (30+ languages covering all major language families)
- Add latitude/longitude coordinates for each destination displayed in package detail or destination info
- Language selector with full world language list in chatbot UI

### Modify
- ChatbotWidget.tsx: rename to DARLING, expand languages to world-wide coverage (English, Hindi, Bengali, Tamil, Telugu, Malayalam, Kannada, Marathi, Gujarati, Punjabi, Urdu, Arabic, French, Spanish, Portuguese, German, Italian, Russian, Chinese Simplified, Chinese Traditional, Japanese, Korean, Thai, Vietnamese, Indonesian, Malay, Swahili, Turkish, Dutch, Polish, Greek, Hebrew, Persian/Farsi, and more)
- packages.ts: add lat/lng coordinates for each destination
- PackageCard or PackagesSection: display coordinates for destinations

### Remove
- Nothing removed

## Implementation Plan
1. Update ChatbotWidget.tsx - rename bot to DARLING, add 40+ world languages with translations for common travel queries
2. Update packages.ts - add lat/lng for Andaman (11.7401° N, 92.6586° E), Lakshadweep (10.5667° N, 72.6417° E), North-East India (26.2006° N, 92.9376° E)
3. Display coordinates in destination sections with a nice map pin icon
