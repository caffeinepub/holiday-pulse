import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Edit,
  Loader2,
  LogIn,
  MessageSquare,
  Palmtree,
  Plus,
  ToggleLeft,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ChatLead } from "../backend.d";
import { staticPackages } from "../data/packages";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllChatLeads,
  useAllEnquiries,
  useAllPackages,
  useDeletePackage,
  useTogglePackageActive,
} from "../hooks/useQueries";

export function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;

  const packagesQuery = useAllPackages();
  const enquiriesQuery = useAllEnquiries();
  const chatLeadsQuery = useAllChatLeads();
  const deletePackage = useDeletePackage();
  const toggleActive = useTogglePackageActive();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPkg, setNewPkg] = useState({
    name: "",
    tagline: "",
    category: "Budget",
    duration: "",
    days: "3",
    nights: "4",
    price: "",
    priceLabel: "starting from",
    inclusions: "",
    exclusions: "",
    highlights: "",
    itinerary: "",
  });

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-card p-10 text-center max-w-sm w-full mx-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-5">
            <Palmtree className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">Admin Panel</h1>
          <p className="text-gray-500 text-sm mb-6">
            Sign in with Internet Identity to manage packages and view
            enquiries.
          </p>
          <Button
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="w-full rounded-full bg-teal-500 hover:bg-teal-600 text-white"
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" /> Sign In to Manage
              </>
            )}
          </Button>
          <a
            href="/"
            className="block mt-4 text-sm text-teal-600 hover:underline"
          >
            ← Back to website
          </a>
        </motion.div>
      </div>
    );
  }

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this package?")) return;
    try {
      await deletePackage.mutateAsync(id);
      toast.success("Package deleted");
    } catch {
      toast.error("Failed to delete package");
    }
  };

  const handleToggle = async (id: bigint) => {
    try {
      await toggleActive.mutateAsync(id);
      toast.success("Package status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const displayPackages =
    packagesQuery.data && packagesQuery.data.length > 0
      ? packagesQuery.data
      : staticPackages.map((p) => ({
          id: BigInt(p.id),
          name: p.name,
          tagline: p.tagline,
          category: p.category,
          duration: p.duration,
          days: BigInt(p.days),
          nights: BigInt(p.nights),
          price: BigInt(p.price),
          priceLabel: p.priceLabel,
          isActive: p.isActive,
          inclusions: p.inclusions,
          exclusions: p.exclusions,
          highlights: p.highlights,
          itinerary: p.itinerary.map((d) => ({
            day: BigInt(d.day),
            title: d.title,
            description: d.description,
            activities: d.activities,
          })),
          order: BigInt(p.id),
        }));

  const leadsCount = chatLeadsQuery.data?.length ?? 0;

  const formatLeadDate = (timestamp: bigint) => {
    if (!timestamp) return "—";
    try {
      // ICP timestamps are in nanoseconds
      const ms = Number(timestamp / 1_000_000n);
      if (ms === 0) return "—";
      return new Date(ms).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-teal-500 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </a>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-2">
            <Palmtree className="w-5 h-5" />
            <span className="font-bold">Holiday Pulse — Admin</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => clear()}
          className="rounded-full border-white/40 text-white hover:bg-white/10"
          data-ocid="admin.secondary_button"
        >
          Sign Out
        </Button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="packages" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="packages" data-ocid="admin.tab">
              Packages
            </TabsTrigger>
            <TabsTrigger value="enquiries" data-ocid="admin.tab">
              Enquiries
            </TabsTrigger>
            <TabsTrigger
              value="chatleads"
              data-ocid="admin.tab"
              className="flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat Leads
              {leadsCount > 0 && (
                <span className="ml-1 bg-teal-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {leadsCount > 9 ? "9+" : leadsCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-800">
                Manage Packages
              </h2>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="rounded-full bg-teal-500 hover:bg-teal-600 text-white"
                data-ocid="admin.open_modal_button"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add New Package
              </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card p-6 mb-6"
                data-ocid="admin.panel"
              >
                <h3 className="font-bold text-navy-800 mb-4">New Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Package Name</Label>
                    <Input
                      value={newPkg.name}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="e.g. Andaman Escape"
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Tagline</Label>
                    <Input
                      value={newPkg.tagline}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, tagline: e.target.value }))
                      }
                      placeholder="Short description"
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Duration (e.g. 3D / 4N)</Label>
                    <Input
                      value={newPkg.duration}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, duration: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Price (₹ per person)</Label>
                    <Input
                      type="number"
                      value={newPkg.price}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, price: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm">
                      Highlights (comma-separated)
                    </Label>
                    <Input
                      value={newPkg.highlights}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, highlights: e.target.value }))
                      }
                      placeholder="Snorkeling, Scuba Diving, Radhanagar Beach"
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">
                      Inclusions (comma-separated)
                    </Label>
                    <Textarea
                      value={newPkg.inclusions}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, inclusions: e.target.value }))
                      }
                      placeholder="Hotel, Transfers, Meals"
                      rows={3}
                      className="mt-1"
                      data-ocid="admin.textarea"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">
                      Exclusions (comma-separated)
                    </Label>
                    <Textarea
                      value={newPkg.exclusions}
                      onChange={(e) =>
                        setNewPkg((p) => ({ ...p, exclusions: e.target.value }))
                      }
                      placeholder="Airfare, Entry fees"
                      rows={3}
                      className="mt-1"
                      data-ocid="admin.textarea"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button
                    className="rounded-full bg-teal-500 hover:bg-teal-600 text-white"
                    onClick={() => {
                      toast.success("Package saved (demo mode)");
                      setShowAddForm(false);
                    }}
                    data-ocid="admin.save_button"
                  >
                    Save Package
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setShowAddForm(false)}
                    data-ocid="admin.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Packages Table */}
            <div
              className="bg-white rounded-2xl shadow-card overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayPackages.map((pkg, i) => (
                    <TableRow
                      key={String(pkg.id)}
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell>
                        <div>
                          <p className="font-semibold text-navy-800">
                            {pkg.name}
                          </p>
                          <p className="text-xs text-gray-500">{pkg.tagline}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium">
                          {pkg.duration}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ₹{Number(pkg.price).toLocaleString("en-IN")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={pkg.isActive ? "default" : "secondary"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggle(pkg.id)}
                            className="rounded-full h-8 w-8 p-0"
                            data-ocid={`admin.toggle.${i + 1}`}
                          >
                            <ToggleLeft className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toast.info("Edit coming soon")}
                            className="rounded-full h-8 w-8 p-0"
                            data-ocid={`admin.edit_button.${i + 1}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(pkg.id)}
                            className="rounded-full h-8 w-8 p-0"
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {packagesQuery.isLoading && (
                <div
                  className="flex justify-center py-8"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Enquiries Tab */}
          <TabsContent value="enquiries">
            <h2 className="text-xl font-bold text-navy-800 mb-6">
              Customer Enquiries
            </h2>
            <div
              className="bg-white rounded-2xl shadow-card overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enquiriesQuery.data?.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-10 text-gray-400"
                        data-ocid="admin.empty_state"
                      >
                        No enquiries yet. Bookings will appear here.
                      </TableCell>
                    </TableRow>
                  )}
                  {enquiriesQuery.data?.map((enq, i) => (
                    <TableRow
                      key={String(enq.id)}
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="font-medium">{enq.name}</TableCell>
                      <TableCell>
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                          className="text-teal-600 hover:underline"
                        >
                          {enq.phone}
                        </a>
                      </TableCell>
                      <TableCell>{enq.email}</TableCell>
                      <TableCell>{enq.packageName}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-gray-500">
                        {enq.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {enquiriesQuery.isLoading && (
                <div
                  className="flex justify-center py-8"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Chat Leads Tab */}
          <TabsContent value="chatleads">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-navy-800">
                  YATRIK Chat Leads
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Customer details collected during chatbot profiling
                </p>
              </div>
              {leadsCount > 0 && (
                <Badge className="bg-teal-500 text-white px-3 py-1 text-sm">
                  {leadsCount} {leadsCount === 1 ? "Lead" : "Leads"}
                </Badge>
              )}
            </div>

            <div
              className="bg-white rounded-2xl shadow-card overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Group Size</TableHead>
                    <TableHead>Travel Timeframe</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLeadsQuery.isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6"
                        data-ocid="admin.loading_state"
                      >
                        <div className="space-y-2">
                          {[1, 2, 3].map((n) => (
                            <Skeleton key={n} className="h-8 w-full" />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {!chatLeadsQuery.isLoading &&
                    (!chatLeadsQuery.data ||
                      chatLeadsQuery.data.length === 0) && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-14"
                          data-ocid="admin.empty_state"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                              <MessageSquare className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">
                                No chat leads yet
                              </p>
                              <p className="text-gray-400 text-sm mt-0.5">
                                Leads from YATRIK will appear here once visitors
                                complete the profiling flow.
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  {chatLeadsQuery.data?.map((lead: ChatLead, i: number) => (
                    <TableRow
                      key={String(lead.id)}
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {lead.email || "—"}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline text-sm"
                        >
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {lead.destination}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.groupSize}
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.travelTimeframe}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                          {lead.experienceType}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatLeadDate(lead.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
