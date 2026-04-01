import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  ClipboardCopy,
  Mail,
  Plus,
  Printer,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";

const PACKAGES = [
  "Andaman Basic",
  "Andaman Deluxe",
  "Andaman Premium",
  "Lakshadweep Standard",
  "Lakshadweep Premium",
  "North-East Explorer",
  "North-East Luxury",
  "Andaman Cruise 3N",
  "Andaman Cruise 5N",
  "Andaman Cruise 7N",
];

const DEFAULT_TERMS = `1. This quotation is valid for the period mentioned above. Prices are subject to change thereafter.
2. A minimum deposit of 25% is required to confirm the booking.
3. Balance payment must be completed 30 days prior to the departure date.
4. Cancellation charges apply as per Holiday Pulse cancellation policy.
5. The package price is inclusive of all taxes and service charges as mentioned.
6. Holiday Pulse reserves the right to modify itineraries due to unforeseen circumstances.
7. Travel insurance is strongly recommended for all travellers.
8. All disputes are subject to jurisdiction of courts in India.
9. GST @ applicable rate will be charged on the total package value.
10. Passport/ID validity of minimum 6 months is required for all domestic travel.`;

interface Addon {
  id: string;
  description: string;
  amount: number;
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function addDays(date: string, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function generateQuotationNumber() {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `HP-${year}-${seq}`;
}

const initialState = () => ({
  quotationNumber: generateQuotationNumber(),
  quotationDate: today(),
  validUntil: addDays(today(), 15),
  clientCompany: "",
  contactPerson: "",
  clientEmail: "",
  clientPhone: "",
  destination: "",
  adults: 2,
  children: 0,
  travelFrom: "",
  travelTo: "",
  basePrice: 0,
  addons: [] as Addon[],
  discount: 0,
  gstPercent: 5,
  specialNotes: "",
  terms: DEFAULT_TERMS,
});

export function QuotationPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState(initialState);
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof ReturnType<typeof initialState>, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addAddon = () =>
    setForm((prev) => ({
      ...prev,
      addons: [
        ...prev.addons,
        { id: crypto.randomUUID(), description: "", amount: 0 },
      ],
    }));

  const updateAddon = (
    id: string,
    field: "description" | "amount",
    value: string | number,
  ) =>
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.map((a) =>
        a.id === id ? { ...a, [field]: value } : a,
      ),
    }));

  const removeAddon = (id: string) =>
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.filter((a) => a.id !== id),
    }));

  const reset = () => setForm(initialState());

  // Calculations
  const totalPax = form.adults + form.children;
  const baseTotal = form.basePrice * (totalPax || 1);
  const addonsTotal = form.addons.reduce((s, a) => s + (a.amount || 0), 0);
  const subtotal = baseTotal + addonsTotal;
  const discountAmt = form.discount || 0;
  const taxableAmount = subtotal - discountAmt;
  const gstAmt = (taxableAmount * (form.gstPercent || 0)) / 100;
  const grandTotal = taxableAmount + gstAmt;

  const buildSummaryText = () => {
    const lines = [
      "HOLIDAY PULSE — TRAVEL QUOTATION",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Quotation #: ${form.quotationNumber}`,
      `Date: ${formatDate(form.quotationDate)}`,
      `Valid Until: ${formatDate(form.validUntil)}`,
      "",
      "TO:",
      form.clientCompany || "Client Company Name",
      form.contactPerson ? `Attn: ${form.contactPerson}` : "",
      form.clientPhone ? `Phone: ${form.clientPhone}` : "",
      form.clientEmail ? `Email: ${form.clientEmail}` : "",
      "",
      "PACKAGE SUMMARY",
      "─────────────────────────────────",
      `Package: ${form.destination || "—"}`,
      `Travel Dates: ${
        form.travelFrom && form.travelTo
          ? `${formatDate(form.travelFrom)} to ${formatDate(form.travelTo)}`
          : form.travelFrom
            ? formatDate(form.travelFrom)
            : "—"
      }`,
      `Travellers: ${form.adults} Adult${form.adults !== 1 ? "s" : ""}${
        form.children > 0
          ? `, ${form.children} Child${form.children !== 1 ? "ren" : ""}`
          : ""
      }`,
      "",
      "PRICE BREAKUP",
      "─────────────────────────────────",
      `Base Package (${totalPax} pax × ${formatINR(form.basePrice)}): ${formatINR(baseTotal)}`,
      ...form.addons
        .filter((a) => a.description || a.amount)
        .map((a) => `${a.description || "Add-on"}: ${formatINR(a.amount)}`),
      `Subtotal: ${formatINR(subtotal)}`,
      discountAmt > 0 ? `Discount: -${formatINR(discountAmt)}` : "",
      `Taxable Amount: ${formatINR(taxableAmount)}`,
      `GST @ ${form.gstPercent}%: ${formatINR(gstAmt)}`,
      "─────────────────────────────────",
      `GRAND TOTAL: ${formatINR(grandTotal)}`,
      "",
      form.specialNotes ? `Special Notes: ${form.specialNotes}` : "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Holiday Pulse | www.holidaypulse.ind",
      "info@holidaypulse.ind | +91-98765 43210",
    ]
      .filter((l) => l !== "")
      .join("\n");
    return lines;
  };

  const handlePrint = () => window.print();

  const handleCopy = async () => {
    const text = buildSummaryText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmail = () => {
    const text = buildSummaryText();
    const subject = encodeURIComponent(
      `Travel Quotation ${form.quotationNumber} — ${form.destination || "Holiday Pulse"}`,
    );
    const body = encodeURIComponent(text);
    const to = encodeURIComponent(
      "info@holidaypulse.ind,siva.samatham@gmail.com",
    );
    if (form.clientEmail.trim()) {
      const cc = encodeURIComponent(form.clientEmail.trim());
      window.open(
        `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`,
        "_blank",
      );
    } else {
      window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
    }
  };

  const emailButtonLabel = form.clientEmail.trim()
    ? "Send Email (CC: client)"
    : "Send Email";

  const handleWhatsApp = () => {
    const lines = [
      "*HOLIDAY PULSE — TRAVEL QUOTATION*",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `*Quotation #:* ${form.quotationNumber}`,
      `*Date:* ${formatDate(form.quotationDate)}`,
      `*Valid Until:* ${formatDate(form.validUntil)}`,
      "",
      "*To:*",
      `${form.clientCompany || "Client"}`,
      form.contactPerson ? `Attn: ${form.contactPerson}` : "",
      form.clientPhone ? `📞 ${form.clientPhone}` : "",
      form.clientEmail ? `✉️ ${form.clientEmail}` : "",
      "",
      `*Package:* ${form.destination || "—"}`,
      `*Travel Dates:* ${form.travelFrom && form.travelTo ? `${formatDate(form.travelFrom)} → ${formatDate(form.travelTo)}` : form.travelFrom ? formatDate(form.travelFrom) : "—"}`,
      `*Travellers:* ${form.adults} Adult${form.adults !== 1 ? "s" : ""}${form.children > 0 ? `, ${form.children} Child${form.children !== 1 ? "ren" : ""}` : ""}`,
      "",
      "*PRICE BREAKUP*",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `Base Package (${totalPax} pax × ${formatINR(form.basePrice)}): ${formatINR(baseTotal)}`,
      ...form.addons
        .filter((a) => a.description || a.amount)
        .map((a) => `${a.description || "Add-on"}: ${formatINR(a.amount)}`),
      discountAmt > 0 ? `Discount: -${formatINR(discountAmt)}` : "",
      `GST @ ${form.gstPercent}%: ${formatINR(gstAmt)}`,
      "",
      `*TOTAL: ${formatINR(grandTotal)}*`,
      "",
      form.specialNotes ? `*Notes:* ${form.specialNotes}` : "",
      "━━━━━━━━━━━━━━━━━━━━━━",
      "Holiday Pulse | www.holidaypulse.ind",
      "info@holidaypulse.ind | +91-98765 43210",
    ]
      .filter((l) => l !== "")
      .join("\n");

    const phone = form.clientPhone ? form.clientPhone.replace(/\D/g, "") : "";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .quotation-print-area, .quotation-print-area * { visibility: visible !important; }
          .quotation-print-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            z-index: 9999;
          }
          .quotation-print-area * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page { margin: 10mm; size: A4; }
        }
      `}</style>

      {/* Top nav bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm print:hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors"
              type="button"
              data-ocid="quotation.link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Holiday Pulse
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-primary text-sm tracking-wide">
              B2B Quotation Generator
            </span>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              data-ocid="quotation.secondary_button"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Reset
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              data-ocid="quotation.copy_button"
              className={
                copied
                  ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  : "border-slate-400 text-slate-600 hover:bg-slate-50"
              }
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <ClipboardCopy className="w-4 h-4 mr-1" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleEmail}
              data-ocid="quotation.email_button"
              title={
                form.clientEmail.trim()
                  ? `Will CC: ${form.clientEmail.trim()}`
                  : "Send to info@holidaypulse.ind"
              }
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="w-4 h-4 mr-1" />
              {emailButtonLabel}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleWhatsApp}
              data-ocid="quotation.whatsapp_button"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <svg
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="WhatsApp"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share on WhatsApp
            </Button>
            <Button
              size="sm"
              onClick={handlePrint}
              data-ocid="quotation.primary_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Printer className="w-4 h-4 mr-1" /> Print / Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Form Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 print:hidden">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-primary" />
            Quotation Details
          </h2>

          <div className="space-y-5">
            {/* Meta */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Document Info
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="qno">Quotation #</Label>
                  <Input
                    id="qno"
                    value={form.quotationNumber}
                    onChange={(e) => set("quotationNumber", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="qdate">Date</Label>
                  <Input
                    id="qdate"
                    type="date"
                    value={form.quotationDate}
                    onChange={(e) => set("quotationDate", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="valid">Valid Until</Label>
                  <Input
                    id="valid"
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => set("validUntil", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* Client */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Client Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="ABC Travels Pvt. Ltd."
                    value={form.clientCompany}
                    onChange={(e) => set("clientCompany", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input
                    id="contact"
                    placeholder="Mr. Rajesh Sharma"
                    value={form.contactPerson}
                    onChange={(e) => set("contactPerson", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@abc.com"
                    value={form.clientEmail}
                    onChange={(e) => set("clientEmail", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98XXXXXXXX"
                    value={form.clientPhone}
                    onChange={(e) => set("clientPhone", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
              </div>
              {form.clientEmail.trim() && (
                <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Sending email will automatically CC{" "}
                  <span className="font-medium">{form.clientEmail.trim()}</span>
                </p>
              )}
            </section>

            <Separator />

            {/* Package */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Package & Travel
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <Label>Destination / Package</Label>
                  <Select
                    value={form.destination}
                    onValueChange={(v) => set("destination", v)}
                  >
                    <SelectTrigger data-ocid="quotation.select">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {PACKAGES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="adults">No. of Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min={1}
                    value={form.adults}
                    onChange={(e) => set("adults", Number(e.target.value))}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="children">No. of Children</Label>
                  <Input
                    id="children"
                    type="number"
                    min={0}
                    value={form.children}
                    onChange={(e) => set("children", Number(e.target.value))}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tfrom">Travel From</Label>
                  <Input
                    id="tfrom"
                    type="date"
                    min={todayStr}
                    value={form.travelFrom}
                    onChange={(e) => set("travelFrom", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tto">Travel To</Label>
                  <Input
                    id="tto"
                    type="date"
                    min={todayStr}
                    value={form.travelTo}
                    onChange={(e) => set("travelTo", e.target.value)}
                    data-ocid="quotation.input"
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* Pricing */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Pricing
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="space-y-1">
                  <Label htmlFor="baseprice">Base Price / Person (₹)</Label>
                  <Input
                    id="baseprice"
                    type="number"
                    min={0}
                    placeholder="15000"
                    value={form.basePrice || ""}
                    onChange={(e) => set("basePrice", Number(e.target.value))}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="discount">Discount (₹)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={form.discount || ""}
                    onChange={(e) => set("discount", Number(e.target.value))}
                    data-ocid="quotation.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gst">GST %</Label>
                  <Input
                    id="gst"
                    type="number"
                    min={0}
                    max={28}
                    value={form.gstPercent}
                    onChange={(e) => set("gstPercent", Number(e.target.value))}
                    data-ocid="quotation.input"
                  />
                </div>
              </div>

              {/* Addons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Add-ons</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAddon}
                    data-ocid="quotation.secondary_button"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Row
                  </Button>
                </div>
                {form.addons.map((addon, idx) => (
                  <div
                    key={addon.id}
                    className="flex gap-2 items-center"
                    data-ocid={`quotation.item.${idx + 1}`}
                  >
                    <Input
                      placeholder="Description"
                      value={addon.description}
                      onChange={(e) =>
                        updateAddon(addon.id, "description", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={addon.amount || ""}
                      onChange={(e) =>
                        updateAddon(addon.id, "amount", Number(e.target.value))
                      }
                      className="w-28"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAddon(addon.id)}
                      className="text-destructive hover:text-destructive"
                      data-ocid={`quotation.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {form.addons.length === 0 && (
                  <p className="text-xs text-slate-400 italic">
                    No add-ons added yet.
                  </p>
                )}
              </div>
            </section>

            <Separator />

            {/* Notes & Terms */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Notes & Terms
              </p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements, visa info, meal preferences..."
                    value={form.specialNotes}
                    onChange={(e) => set("specialNotes", e.target.value)}
                    rows={3}
                    data-ocid="quotation.textarea"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    value={form.terms}
                    onChange={(e) => set("terms", e.target.value)}
                    rows={6}
                    className="text-xs"
                    data-ocid="quotation.textarea"
                  />
                </div>
              </div>
            </section>

            {/* Action buttons bottom */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handlePrint}
                data-ocid="quotation.submit_button"
              >
                <Printer className="w-4 h-4 mr-2" /> Print / Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
                data-ocid="quotation.copy_button"
                className={
                  copied
                    ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    : "border-slate-400 text-slate-600 hover:bg-slate-50"
                }
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <ClipboardCopy className="w-4 h-4 mr-1" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="outline"
                onClick={handleEmail}
                data-ocid="quotation.email_button"
                title={
                  form.clientEmail.trim()
                    ? `Will CC: ${form.clientEmail.trim()}`
                    : "Send to info@holidaypulse.ind"
                }
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Mail className="w-4 h-4 mr-1" />
                {emailButtonLabel}
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                data-ocid="quotation.whatsapp_button"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                data-ocid="quotation.cancel_button"
              >
                <RefreshCw className="w-4 h-4 mr-1" /> Reset
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Quotation Document */}
        <div className="sticky top-4">
          <div
            ref={printRef}
            className="quotation-print-area bg-white shadow-lg border border-slate-200 rounded-xl overflow-hidden"
            style={{ fontFamily: "'Times New Roman', serif", fontSize: 13 }}
          >
            {/* Colored header band */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #1a7a74 0%, #2FA7A0 60%, #3bbdb5 100%)",
                padding: "24px 28px",
                color: "white",
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                {/* Logo & company info */}
                <div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      lineHeight: 1,
                    }}
                  >
                    HOLIDAY PULSE
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.85,
                      marginTop: 4,
                      fontStyle: "italic",
                    }}
                  >
                    Your Journey, Our Passion
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      opacity: 0.8,
                      marginTop: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    www.holidaypulse.ind &nbsp;|&nbsp; info@holidaypulse.ind
                    &nbsp;|&nbsp; +91-98765 43210
                  </div>
                </div>
                {/* Quotation meta */}
                <div style={{ textAlign: "right", minWidth: 170 }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      opacity: 0.95,
                    }}
                  >
                    QUOTATION
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6, lineHeight: 1.8 }}>
                    <div>
                      <strong>#</strong> {form.quotationNumber || "—"}
                    </div>
                    <div>
                      <strong>Date:</strong> {formatDate(form.quotationDate)}
                    </div>
                    <div>
                      <strong>Valid Until:</strong>{" "}
                      {formatDate(form.validUntil)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 28px" }}>
              {/* To block */}
              <div
                style={{
                  background: "#f0faf9",
                  border: "1px solid #c8eeeb",
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1a7a74",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  To
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  {form.clientCompany || "Client Company Name"}
                </div>
                <div style={{ color: "#444", fontSize: 12, marginTop: 2 }}>
                  {form.contactPerson || "Contact Person"}
                </div>
                {form.clientEmail && (
                  <div style={{ color: "#555", fontSize: 11 }}>
                    {form.clientEmail}
                  </div>
                )}
                {form.clientPhone && (
                  <div style={{ color: "#555", fontSize: 11 }}>
                    {form.clientPhone}
                  </div>
                )}
              </div>

              {/* Package summary */}
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1a7a74",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    borderBottom: "1px solid #c8eeeb",
                    paddingBottom: 4,
                  }}
                >
                  Package Summary
                </div>
                <table
                  style={{
                    width: "100%",
                    fontSize: 12,
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "3px 0",
                          color: "#666",
                          width: "40%",
                        }}
                      >
                        Destination / Package
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {form.destination || "—"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "3px 0", color: "#666" }}>
                        Travel Dates
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {form.travelFrom && form.travelTo
                          ? `${formatDate(form.travelFrom)} → ${formatDate(form.travelTo)}`
                          : form.travelFrom
                            ? formatDate(form.travelFrom)
                            : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "3px 0", color: "#666" }}>
                        Travellers
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {form.adults} Adult{form.adults !== 1 ? "s" : ""}
                        {form.children > 0
                          ? `, ${form.children} Child${form.children !== 1 ? "ren" : ""}`
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pricing table */}
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1a7a74",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    borderBottom: "1px solid #c8eeeb",
                    paddingBottom: 4,
                  }}
                >
                  Price Breakup
                </div>
                <table
                  style={{
                    width: "100%",
                    fontSize: 11.5,
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#1a7a74", color: "white" }}>
                      <th
                        style={{
                          padding: "6px 8px",
                          textAlign: "left",
                          fontWeight: 600,
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          padding: "6px 8px",
                          textAlign: "center",
                          fontWeight: 600,
                          width: 50,
                        }}
                      >
                        Qty
                      </th>
                      <th
                        style={{
                          padding: "6px 8px",
                          textAlign: "right",
                          fontWeight: 600,
                          width: 110,
                        }}
                      >
                        Unit Price
                      </th>
                      <th
                        style={{
                          padding: "6px 8px",
                          textAlign: "right",
                          fontWeight: 600,
                          width: 110,
                        }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Base */}
                    <tr style={{ background: "#f8fffe" }}>
                      <td style={{ padding: "6px 8px" }}>
                        Base Package — {form.destination || "Package"}
                      </td>
                      <td style={{ padding: "6px 8px", textAlign: "center" }}>
                        {totalPax}
                      </td>
                      <td style={{ padding: "6px 8px", textAlign: "right" }}>
                        {formatINR(form.basePrice)}
                      </td>
                      <td style={{ padding: "6px 8px", textAlign: "right" }}>
                        {formatINR(baseTotal)}
                      </td>
                    </tr>
                    {/* Addons */}
                    {form.addons.map((a, i) => (
                      <tr
                        key={a.id}
                        style={{
                          background: i % 2 === 0 ? "white" : "#f8fffe",
                        }}
                      >
                        <td style={{ padding: "6px 8px" }}>
                          {a.description || "Add-on"}
                        </td>
                        <td style={{ padding: "6px 8px", textAlign: "center" }}>
                          1
                        </td>
                        <td style={{ padding: "6px 8px", textAlign: "right" }}>
                          {formatINR(a.amount)}
                        </td>
                        <td style={{ padding: "6px 8px", textAlign: "right" }}>
                          {formatINR(a.amount)}
                        </td>
                      </tr>
                    ))}
                    {/* Subtotal */}
                    <tr
                      style={{
                        borderTop: "1px solid #ccc",
                        background: "#f0faf9",
                      }}
                    >
                      <td
                        colSpan={3}
                        style={{ padding: "6px 8px", fontWeight: 600 }}
                      >
                        Subtotal
                      </td>
                      <td
                        style={{
                          padding: "6px 8px",
                          textAlign: "right",
                          fontWeight: 600,
                        }}
                      >
                        {formatINR(subtotal)}
                      </td>
                    </tr>
                    {/* Discount */}
                    {discountAmt > 0 && (
                      <tr style={{ color: "#c0392b" }}>
                        <td colSpan={3} style={{ padding: "5px 8px" }}>
                          Discount
                        </td>
                        <td style={{ padding: "5px 8px", textAlign: "right" }}>
                          - {formatINR(discountAmt)}
                        </td>
                      </tr>
                    )}
                    {/* Taxable */}
                    <tr style={{ background: "#f8fffe" }}>
                      <td colSpan={3} style={{ padding: "5px 8px" }}>
                        Taxable Amount
                      </td>
                      <td style={{ padding: "5px 8px", textAlign: "right" }}>
                        {formatINR(taxableAmount)}
                      </td>
                    </tr>
                    {/* GST */}
                    <tr style={{ background: "white" }}>
                      <td colSpan={3} style={{ padding: "5px 8px" }}>
                        GST @ {form.gstPercent}%
                      </td>
                      <td style={{ padding: "5px 8px", textAlign: "right" }}>
                        {formatINR(gstAmt)}
                      </td>
                    </tr>
                    {/* Grand Total */}
                    <tr style={{ background: "#1a7a74", color: "white" }}>
                      <td
                        colSpan={3}
                        style={{
                          padding: "8px",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        TOTAL AMOUNT
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "right",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {formatINR(grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    fontSize: 10,
                    color: "#888",
                    marginTop: 6,
                    textAlign: "right",
                  }}
                >
                  All amounts in Indian Rupees (INR)
                </div>
              </div>

              {/* Special Notes */}
              {form.specialNotes && (
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#1a7a74",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                      borderBottom: "1px solid #c8eeeb",
                      paddingBottom: 4,
                    }}
                  >
                    Special Notes
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#444",
                      lineHeight: 1.7,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {form.specialNotes}
                  </p>
                </div>
              )}

              {/* Terms & Conditions */}
              <div style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1a7a74",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    borderBottom: "1px solid #c8eeeb",
                    paddingBottom: 4,
                  }}
                >
                  Terms & Conditions
                </div>
                <p
                  style={{
                    fontSize: 10.5,
                    color: "#555",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {form.terms}
                </p>
              </div>

              {/* Signature Block */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #c8eeeb",
                  paddingTop: 16,
                  marginBottom: 12,
                }}
              >
                <div style={{ width: "45%" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 32,
                      color: "#1a7a74",
                    }}
                  >
                    For Holiday Pulse
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid #999",
                      paddingTop: 4,
                      fontSize: 10,
                      color: "#777",
                    }}
                  >
                    Authorized Signatory
                  </div>
                  <div style={{ marginTop: 6, fontSize: 10, color: "#777" }}>
                    Date: ____________________
                  </div>
                </div>
                <div style={{ width: "45%", textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 32,
                      color: "#555",
                    }}
                  >
                    Client Acknowledgement
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid #999",
                      paddingTop: 4,
                      fontSize: 10,
                      color: "#777",
                    }}
                  >
                    Signature & Stamp
                  </div>
                  <div style={{ marginTop: 6, fontSize: 10, color: "#777" }}>
                    Date: ____________________
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  background: "#f0faf9",
                  borderTop: "1px solid #c8eeeb",
                  padding: "8px 0",
                  textAlign: "center",
                  fontSize: 10,
                  color: "#666",
                }}
              >
                This is a computer-generated quotation. For queries:
                info@holidaypulse.ind &nbsp;|&nbsp; +91-98765 43210
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page footer */}
      <footer className="text-center text-xs text-slate-400 py-6 print:hidden">
        © {new Date().getFullYear()} Holiday Pulse. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
