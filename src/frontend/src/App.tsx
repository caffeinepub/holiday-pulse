import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ClientsSection } from "./components/ClientsSection";
import { ContactSection } from "./components/ContactSection";
import DarlingChatbot from "./components/DarlingChatbot";
import { EnquiryModal } from "./components/EnquiryModal";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { Header } from "./components/Header";
import { HeroScene } from "./components/HeroScene";
import { PackagesSection } from "./components/PackagesSection";
import { StatsBar } from "./components/StatsBar";
import { TripFinder } from "./components/TripFinder";
import { WhyChooseSection } from "./components/WhyChooseSection";
import type { PackageData } from "./data/packages";
import { AdminPage } from "./pages/AdminPage";

function HomePage() {
  const packagesRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = (pkg: PackageData) => {
    setSelectedPkg(pkg);
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onAdminClick={() => router.navigate({ to: "/admin" })} />
      <main>
        <HeroScene onExploreClick={scrollToPackages} />
        <TripFinder />
        <StatsBar />
        <div ref={packagesRef}>
          <PackagesSection onBookNow={handleBookNow} />
        </div>
        <GallerySection />
        <ClientsSection />
        <WhyChooseSection />
        <ContactSection />
      </main>
      <Footer />
      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        selectedPackage={selectedPkg}
      />
      <DarlingChatbot />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([homeRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
