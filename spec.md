# Holiday Pulse – B2B Quotation Page

## Current State
Holiday Pulse is a full-featured travel website with packages for Andaman, Lakshadweep, North-East India, and Andaman Cruise. The site has booking modals, enquiry forms, admin panel, and WhatsApp integration. No formal B2B quotation tool exists.

## Requested Changes (Diff)

### Add
- A new `/quotation` route rendering a dedicated B2B Quotation Generator page
- A quotation form where Holiday Pulse staff/admin can fill in:
  - Client company name, contact person, email, phone
  - Quotation number (auto-generated, e.g. HP-2026-001)
  - Quotation date and validity date
  - Select destination/package (Andaman, Lakshadweep, North-East, Cruise)
  - Number of adults, children
  - Travel dates
  - Itemized cost breakdown (package cost, taxes, addons, discounts)
  - Terms & conditions
  - Special notes
- A live preview panel showing the formatted PDF-ready quotation
- Print / Download PDF button (using browser print)
- The quotation document itself must be official-looking with:
  - Holiday Pulse logo/header with company details
  - Quotation number, date, validity
  - Client details block
  - Itemized pricing table
  - Terms & conditions section
  - Authorized signature block
  - Professional footer

### Modify
- None to existing features

### Remove
- Nothing

## Implementation Plan
1. Create `src/frontend/src/pages/QuotationPage.tsx` with form + live preview layout
2. Add `/quotation` route in `App.tsx`
3. Add print CSS styles so only the quotation document prints (not the form)
4. Auto-generate quotation numbers based on current date
5. All pricing in INR with GST breakdown
