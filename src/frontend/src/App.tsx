import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useRef, useState } from "react";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { ClientsSection } from "./components/ClientsSection";
import { ContactSection } from "./components/ContactSection";
import DarlingChatbot from "./components/DarlingChatbot";
import { EnquiryModal } from "./components/EnquiryModal";
import { FlashSaleBanner } from "./components/FlashSaleBanner";
import { FlashSaleSection } from "./components/FlashSaleSection";
import { FlickerBookSection } from "./components/FlickerBookSection";
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

const BANNER_HEIGHT = 52; // px — height of the FlashSaleBanner bar

function HomePage() {
  const packagesRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(
    () => sessionStorage.getItem("hp_banner_dismissed") === "1",
  );

  const bannerShowing = !bannerDismissed;

  const handleDismissBanner = () => {
    sessionStorage.setItem("hp_banner_dismissed", "1");
    setBannerDismissed(true);
  };

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = (pkg: PackageData) => {
    setSelectedPkg(pkg);
    setEnquiryOpen(true);
  };

  const handleFlashSaleBookNow = () => {
    scrollToPackages();
  };

  return (
    <div className="min-h-screen">
      {/* Fixed flash sale banner — sits above the header */}
      {bannerShowing && <FlashSaleBanner onDismiss={handleDismissBanner} />}

      {/* Header pushed down by banner height when banner is visible */}
      <Header
        onAdminClick={() => router.navigate({ to: "/admin" })}
        bannerHeight={bannerShowing ? BANNER_HEIGHT : 0}
      />

      <main>
        <HeroScene onExploreClick={scrollToPackages} />
        <FlashSaleSection onBookNow={handleFlashSaleBookNow} />
        <TripFinder />
        <StatsBar />
        <div ref={packagesRef} id="packages">
          <PackagesSection onBookNow={handleBookNow} />
        </div>
        <GallerySection />
        <FlickerBookSection />
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
      {/* Floating ambient music player — bottom-left */}
      <BackgroundMusic />
      {/* DARLING chatbot — bottom-right */}
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
