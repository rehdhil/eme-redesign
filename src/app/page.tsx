import dynamic from 'next/dynamic';
import HeroVideo from '@/components/ui/hero-video';

// Dynamic imports for performance (code splitting)
const Navbar = dynamic(() => import('./client-sections').then(m => m.Navbar), { ssr: true });
const PartnersCarousel = dynamic(() => import('./client-sections').then(m => m.PartnersCarousel), { ssr: true });
const AboutSection = dynamic(() => import('./client-sections').then(m => m.AboutSection), { ssr: true });
const CoursesSection = dynamic(() => import('./client-sections').then(m => m.CoursesSection), { ssr: true });
const PlacementSection = dynamic(() => import('./client-sections').then(m => m.PlacementSection), { ssr: true });
const ContactSection = dynamic(() => import('./client-sections').then(m => m.ContactSection), { ssr: false }); // Disable SSR for forms
const Footer = dynamic(() => import('./client-sections').then(m => m.Footer), { ssr: true });
const CanvasRevealWrapper = dynamic(() => import('./client-sections').then(m => m.CanvasRevealWrapper), { ssr: true });

// Lazy load complex sections
const FocusFeatures = dynamic(() => import('@/components/ui/complex-sections').then(m => m.FocusFeatures), { ssr: true });
const BentoShortsGrid = dynamic(() => import('@/components/ui/complex-sections').then(m => m.BentoShortsGrid), { ssr: true });

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-900 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-end pointer-events-none">
        <div className="w-full h-[50vh] bg-gradient-to-at-t from-black to-transparent opacity-80" />
      </div>

      <Navbar />

      <CanvasRevealWrapper
        mainContent={
          <>
            <HeroVideo />
            <PartnersCarousel />
            <AboutSection />
            <CoursesSection />
            <PlacementSection />
            <FocusFeatures />
            <BentoShortsGrid />
          </>
        }
        contactContent={<ContactSection />}
      />

      <div className="relative z-20 bg-black">
        <Footer />
      </div>
    </main>
  );
}
