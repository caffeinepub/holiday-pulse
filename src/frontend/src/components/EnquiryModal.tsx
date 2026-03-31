import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { staticPackages } from "../data/packages";
import type { PackageData } from "../data/packages";
import { useSubmitEnquiry } from "../hooks/useQueries";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  selectedPackage?: PackageData | null;
}

const CABIN_TYPES = [
  { value: "interior", label: "Interior Cabin" },
  { value: "ocean-view", label: "Ocean View Cabin" },
  { value: "balcony", label: "Balcony Cabin" },
  { value: "suite", label: "Suite" },
];

function isCruisePackage(pkg: PackageData | null | undefined): boolean {
  if (!pkg) return false;
  return (
    (pkg as any).destination === "andaman-cruise" ||
    pkg.name.toLowerCase().includes("cruise")
  );
}

export function EnquiryModal({
  open,
  onClose,
  selectedPackage,
}: EnquiryModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    packageId: selectedPackage ? String(selectedPackage.id) : "",
    travelDate: "",
    persons: "2",
    message: "",
    cabinType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitEnquiry = useSubmitEnquiry();

  const selectedPkg =
    staticPackages.find((p) => String(p.id) === form.packageId) ||
    selectedPackage;

  const isCruise = isCruisePackage(selectedPkg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cabinLine =
      isCruise && form.cabinType
        ? ` | Cabin Type: ${CABIN_TYPES.find((c) => c.value === form.cabinType)?.label || form.cabinType}`
        : "";
    try {
      await submitEnquiry.mutateAsync({
        id: BigInt(0),
        packageId: BigInt(form.packageId || 1),
        packageName: selectedPkg?.name || "",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `Travel Date: ${form.travelDate} | Persons: ${form.persons}${cabinLine} | ${form.message}`,
        timestamp: BigInt(Date.now()),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const cabinLabel =
    isCruise && form.cabinType
      ? ` | Cabin: ${CABIN_TYPES.find((c) => c.value === form.cabinType)?.label || form.cabinType}`
      : "";

  const waMessage = encodeURIComponent(
    `Hi Holiday Pulse! I'm interested in ${selectedPkg?.name || "an Andaman package"}${cabinLabel}. Please share details.`,
  );

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      packageId: selectedPackage ? String(selectedPackage.id) : "",
      travelDate: "",
      persons: "2",
      message: "",
      cabinType: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto" data-ocid="enquiry.dialog">
        <DialogHeader>
          <DialogTitle className="text-navy-800 font-bold text-xl">
            {submitted ? "Enquiry Sent! 🎉" : "Book / Enquire Now"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle className="w-16 h-16 text-teal-500" />
            <p className="text-center text-gray-600">
              Thank you, <strong>{form.name}</strong>! We've received your
              enquiry for <strong>{selectedPkg?.name}</strong>. Our team will
              contact you within 24 hours.
            </p>
            <p className="text-sm text-gray-400">
              Or reach us directly on WhatsApp:
            </p>
            <a
              href={`https://wa.me/919160393773?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
            <Button
              variant="outline"
              onClick={handleClose}
              className="rounded-full"
              data-ocid="enquiry.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="enq-name" className="text-sm font-medium">
                  Name *
                </Label>
                <Input
                  id="enq-name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="mt-1"
                  data-ocid="enquiry.input"
                />
              </div>
              <div>
                <Label htmlFor="enq-phone" className="text-sm font-medium">
                  Phone *
                </Label>
                <Input
                  id="enq-phone"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-1"
                  data-ocid="enquiry.input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="enq-email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="enq-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="you@email.com"
                className="mt-1"
                data-ocid="enquiry.input"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Package</Label>
              <Select
                value={form.packageId}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, packageId: v, cabinType: "" }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="enquiry.select">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {staticPackages.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name} ({p.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isCruise && (
              <div>
                <Label className="text-sm font-medium">🛳️ Cabin Type</Label>
                <Select
                  value={form.cabinType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, cabinType: v }))
                  }
                >
                  <SelectTrigger
                    className="mt-1 border-blue-300 focus:ring-blue-400"
                    data-ocid="enquiry.select"
                  >
                    <SelectValue placeholder="Select cabin type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CABIN_TYPES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="enq-date" className="text-sm font-medium">
                  Travel Date
                </Label>
                <Input
                  id="enq-date"
                  type="date"
                  value={form.travelDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, travelDate: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="enquiry.input"
                />
              </div>
              <div>
                <Label htmlFor="enq-persons" className="text-sm font-medium">
                  Persons
                </Label>
                <Input
                  id="enq-persons"
                  type="number"
                  min="1"
                  max="50"
                  value={form.persons}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, persons: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="enquiry.input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="enq-message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="enq-message"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Any special requirements or questions?"
                rows={3}
                className="mt-1"
                data-ocid="enquiry.textarea"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                type="submit"
                disabled={submitEnquiry.isPending}
                className="flex-1 rounded-full bg-coral-500 hover:bg-coral-600 text-white"
                data-ocid="enquiry.submit_button"
              >
                {submitEnquiry.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
              <a
                href={`https://wa.me/919160393773?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
