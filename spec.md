# Holiday Pulse – SEO Optimization

## Current State
The site is a full-featured travel packages website for Holiday Pulse covering Andaman & Nicobar, Lakshadweep, and North-East India. The `index.html` has an empty `<title>` and no SEO meta tags. There is no `robots.txt`, `sitemap.xml`, or structured data. The site cannot be properly discovered or ranked by Google.

## Requested Changes (Diff)

### Add
- Full meta tag block in `index.html`: title, description, keywords, author, geo tags
- Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- JSON-LD structured data in `index.html` — TravelAgency schema with services for Andaman, Lakshadweep, North-East India, and cruise packages
- `robots.txt` in `public/` — allow all crawlers, point to sitemap
- `sitemap.xml` in `public/` — include homepage URL and section anchors
- Canonical link tag
- Favicon meta (theme-color, apple-touch-icon)

### Modify
- `index.html` `<title>` from empty to: `Holiday Pulse | Andaman, Lakshadweep & North-East India Travel Packages`
- `<html lang="en">` stays as-is

### Remove
- Nothing removed

## Implementation Plan
1. Update `src/frontend/index.html` with all SEO meta tags, Open Graph, Twitter Cards, canonical link, and JSON-LD structured data block for TravelAgency.
2. Create `src/frontend/public/robots.txt` allowing all bots and pointing to sitemap.
3. Create `src/frontend/public/sitemap.xml` with main page URL and key section anchors.
4. Validate build passes.
