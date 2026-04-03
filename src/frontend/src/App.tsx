import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { ClientsSection } from "./components/ClientsSection";
import { ContactSection } from "./components/ContactSection";
import YatrikChatbot from "./components/DarlingChatbot";
import { EnquiryModal } from "./components/EnquiryModal";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { FeaturedCruiseBanner } from "./components/FeaturedCruiseBanner";
import { FlashSaleBanner } from "./components/FlashSaleBanner";
import { FlashSaleSection } from "./components/FlashSaleSection";
import { FlickerBookSection } from "./components/FlickerBookSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HappyClientsPhotoWall } from "./components/HappyClientsPhotoWall";
import { Header } from "./components/Header";
import { HeroScene } from "./components/HeroScene";
import { PackagesSection } from "./components/PackagesSection";
import { ReferAndSave } from "./components/ReferAndSave";
import { SocialProofToast } from "./components/SocialProofToast";
import { StatsBar } from "./components/StatsBar";
import { TravelBlogSection } from "./components/TravelBlogSection";
import { TripFinder } from "./components/TripFinder";
import { VideoTestimonialsSection } from "./components/VideoTestimonialsSection";
import { WhatsAppFloatingCTA } from "./components/WhatsAppFloatingCTA";
import { WhyChooseSection } from "./components/WhyChooseSection";
import type { PackageData } from "./data/packages";
import { AdminPage } from "./pages/AdminPage";
import { LandingOfferPage } from "./pages/LandingOfferPage";
import { QuotationPage } from "./pages/QuotationPage";

const BANNER_HEIGHT = 52; // px — height of the FlashSaleBanner bar

// Inject Google Translate script once globally
function useGoogleTranslate() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    // Define callback before loading script
    (window as any).googleTranslateElementInit = () => {
      if ((window as any).google?.translate?.TranslateElement) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages:
              "af,sq,am,ar,hy,as,ay,az,bm,eu,be,bn,bho,bs,bg,ca,ceb,zh-CN,zh-TW,co,hr,cs,da,dv,doi,nl,eo,et,ee,fil,fi,fr,fy,gl,ka,de,el,gn,gu,ht,ha,haw,he,hi,hmn,hu,is,ig,ilo,id,ga,it,ja,jv,kn,kk,km,rw,gom,ko,kri,ku,ckb,ky,lo,la,lv,ln,lt,lg,lb,mk,mai,mg,ms,ml,mt,mi,mr,mni-Mtei,lus,mn,my,ne,no,ny,or,om,ps,fa,pl,pt,pa,qu,ro,ru,sm,sa,gd,nso,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tl,tg,ta,tt,te,th,ti,ts,tr,tk,ak,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
          },
          "google_translate_element",
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);
}

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
        <FeaturedCruiseBanner />
        <TripFinder />
        <StatsBar />
        <div ref={packagesRef} id="packages">
          <PackagesSection onBookNow={handleBookNow} />
        </div>
        <GallerySection />
        <FlickerBookSection />
        <HappyClientsPhotoWall />
        <VideoTestimonialsSection />
        <ClientsSection />
        <WhyChooseSection />
        <TravelBlogSection />
        <ContactSection />
        {/* Refer & Save — between testimonials/blog and footer */}
        <ReferAndSave />
      </main>
      <Footer />
      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        selectedPackage={selectedPkg}
      />
      {/* Floating ambient music player — bottom-left */}
      <BackgroundMusic />
      {/* YATRIK chatbot — bottom-right */}
      <YatrikChatbot />
      {/* WhatsApp floating CTA — bottom-right above chatbot */}
      <WhatsAppFloatingCTA />
      {/* Social proof toast — bottom-left */}
      <SocialProofToast />
      {/* Exit intent popup */}
      <ExitIntentPopup />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      {/* Hidden Google Translate widget element — DO NOT remove */}
      <div id="google_translate_element" style={{ display: "none" }} />
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

const quotationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotation",
  component: QuotationPage,
});

const offerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offer",
  component: LandingOfferPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  adminRoute,
  quotationRoute,
  offerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppWithTranslate() {
  useGoogleTranslate();
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppWithTranslate />;
}
