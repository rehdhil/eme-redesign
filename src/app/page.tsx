'use client';


import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants, useInView, useMotionValue, animate } from 'framer-motion';
import { Phone, Mail, ArrowRight, MonitorPlay, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Import our rich new animated sections
import HeroVideo from '@/components/ui/hero-video';
import { FocusFeatures, BentoShortsGrid } from '@/components/ui/complex-sections';
import { ShinyButton } from '@/components/ui/shiny-button';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { LogoCloud } from '@/components/ui/logo-cloud-3';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <Image
              src="https://emeeducation.com/wp-content/uploads/2025/06/LOGO.png"
              alt="EME Education Logo"
              width={140}
              height={44}
              className="object-contain"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About Us', href: '#about' },
              { name: 'Courses', href: '#courses' },
              { name: 'Placements', href: '#placement' },
              { name: 'Contact Us', href: '#contact' },
            ].map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold tracking-wide text-slate-300 hover:text-brand-orange transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <ShinyButton href="#contact" className="hidden md:inline-flex py-3 px-8 text-sm">
            Enroll Now
          </ShinyButton>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-white rounded-full"></span>
              <span className="block w-6 h-0.5 bg-white rounded-full"></span>
              <span className="block w-4 h-0.5 bg-brand-blue rounded-full"></span>
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col pt-24 px-8"
          >
            <button className="absolute top-6 right-6 text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-3xl font-light">&times;</span>
            </button>
            <nav className="flex flex-col gap-6 text-2xl font-bold tracking-wide text-white">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Courses', href: '#courses' },
                { name: 'Placements', href: '#placement' },
                { name: 'Contact Us', href: '#contact' },
              ].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors border-b border-white/10 pb-4">
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mt-12">
              <motion.a variants={fadeUp} href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-black font-extrabold text-sm hover:bg-orange-500 hover:scale-105 transition-all shadow-[0_0_15px_rgba(198,108,44,0.3)]">
                Explore Courses <ArrowRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PartnersCarousel = () => {
  const logoFiles = [
    "hcl-logo.webp", "arrikar-logo.webp", "capegemini-logo.webp", "mahindra-cie-logo.webp",
    "mantle-logo.webp", "Accenture-logo.webp", "Claysis-logo.webp", "Cognizent-logo.webp",
    "EY-logo.webp", "hotpack-logo.webp", "Infosys-logo.webp", "NTTdata-logo.webp",
    "Olam-logo.webp", "pwc-logo.webp", "tcs-logo.webp", "UST-logo.webp"
  ];

  const logos = logoFiles.map((file) => ({
    src: `https://emeeducation.com/wp-content/uploads/2025/06/${file}`,
    alt: file.replace('-logo.webp', '').toUpperCase(),
    height: 80,
    width: 280
  }));

  return (
    <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-4 block">Our Hiring Partners</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Get Ready to Be<br />the Next One Hired</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join the ranks of our successful alumni who have secured elite positions across these top-tier global corporations.
          </p>
        </div>

        <div className="w-full max-w-7xl">
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ from, to, suffix, duration = 2 }: { from: number, to: number, suffix: string, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const count = useMotionValue(from);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [inView, count, to, duration]);

  useEffect(() => {
    return count.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
  }, [count, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-32 bg-black relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="lg:col-span-1">
            <motion.span variants={fadeUp} className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-4 inline-block">About Us</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">India&apos;s Largest<br />SAP Education Partner</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-10">
              India&apos;s largest SAP education partner consecutively for the past 4 years. We have taught more than 1000 students and have partnered with more than 100 educational institutions PAN India providing quality SAP education and placements in our hiring partner companies.
            </motion.p>

            <div className="grid grid-cols-3 gap-6 w-full mb-10">
              {[{ v: 85, suffix: "%", l: "Placement Rate" }, { v: 14, suffix: "+", l: "Years in Business" }, { v: 200, suffix: "+", l: "Hiring Partners" }].map((s, i) => (
                <motion.div variants={fadeUp} key={i} className="border-l-2 border-brand-blue/30 pl-4 py-1">
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter from={0} to={s.v} suffix={s.suffix} />
                  </p>
                  <p className="text-slate-500 text-sm uppercase tracking-wider">{s.l}</p>
                </motion.div>
              ))}
            </div>

            <ShinyButton href="#contact" className="mt-4">
              Explore Courses <ArrowRight size={16} />
            </ShinyButton>
          </div>
          <div className="lg:col-span-1 hidden md:flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-sm aspect-square flex items-center justify-center"
            >
              {/* Minimal Abstract glowing core */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-brand-blue/40"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" }, scale: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                className="absolute inset-8 rounded-full border border-brand-orange/20 mix-blend-screen"
              />
              <div className="absolute inset-16 rounded-full bg-brand-blue/10 blur-3xl"></div>
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-teal-400 shadow-[0_0_50px_rgba(44,134,198,0.6)] flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 blur-md transform translate-y-[-50%]"></div>
              </motion.div>

              <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-center w-full">
                <p className="text-sm font-semibold text-brand-blue tracking-widest uppercase">The Core of SAP Excellence</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CoursesSection = () => {
  const courses = [
    {
      title: "SAP FICO Training",
      sub: "Finance & Controlling",
      desc: "Master financial accounting and controlling processes. Perfect for commerce graduates and finance professionals aiming for elite MNC roles.",
      meta: "10-12 Weeks",
      career: "SAP FICO Consultant, Financial Analyst"
    },
    {
      title: "SAP MM Training",
      sub: "Material Management",
      desc: "Gain expertise in procurement and inventory management. Essential for supply chain professionals and logistics coordinators.",
      meta: "8-10 Weeks",
      career: "SAP MM Consultant, Procurement Head"
    },
    {
      title: "SAP SD Training",
      sub: "Sales & Distribution",
      desc: "Learn end-to-end sales processes, from order to cash. Highly demanded skill for sales managers and business analysts.",
      meta: "8-10 Weeks",
      career: "SAP SD Consultant, Business Analyst"
    },
    {
      title: "SAP ABAP Training",
      sub: "Advanced Business Application Programming",
      desc: "Become a proficient SAP developer. Learn to customize and build advanced applications directly within the SAP ecosystem.",
      meta: "10-12 Weeks",
      career: "SAP Technical Consultant, ABAP Developer"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-32 bg-slate-900 border-t border-b border-white/5 relative z-10" id="courses">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-4 block">Our Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Our SAP<br />Certification Programs</h2>
          </div>
          <ShinyButton href="#contact" className="hidden md:inline-flex py-3">
            Download Full Syllabus <ArrowRight size={16} />
          </ShinyButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, i) => (
            <div key={i} className="group bg-black border border-white/5 rounded-3xl p-8 hover:border-brand-blue/30 hover:bg-slate-900/50 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(44,134,198,0.1)] flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{c.title}</h3>
                  <div className="h-8 w-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-colors">
                    <MonitorPlay size={14} />
                  </div>
                </div>
                <span className="inline-block px-2 py-1 bg-brand-blue/10 rounded text-xs font-bold text-brand-blue mb-4">{c.sub}</span>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">{c.desc}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">
                  <Clock size={12} /> {c.meta} • Online/Offline
                </div>
                <hr className="border-white/5 mb-4" />
                <div className="text-xs text-slate-300 mb-6">Career: <span className="text-white font-semibold">{c.career}</span></div>
                <a href="#contact" className="flex items-center justify-between text-sm font-bold text-brand-orange group-hover:text-orange-400 transition-colors">
                  View Syllabus <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlacementSection = () => {
  const items: CardStackItem[] = [
    { id: 1, title: "Vishnu", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/vishnu.jpg" },
    { id: 2, title: "Akhil S", description: "Placed as SAP Associate", imageSrc: "/Placement Stories/Akhil-s.jpg" },
    { id: 3, title: "Anju", description: "Placed as SAP Analyst", imageSrc: "/Placement Stories/Anju-1.jpg" },
    { id: 4, title: "Fayida M", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/Fayida-M.jpg" },
    { id: 5, title: "Mohammed Faris", description: "Placed as SAP Developer", imageSrc: "/Placement Stories/Mohammed-faris.jpg" },
    { id: 6, title: "Monisha", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/Monisha.jpg" },
    { id: 7, title: "Ajith Krishna", description: "Placed as SAP Associate", imageSrc: "/Placement Stories/Ajith-krishna.jpg" },
    { id: 8, title: "Bastian", description: "Placed as SAP Analyst", imageSrc: "/Placement Stories/Bastian-1.jpg" },
    { id: 9, title: "Jyothikrishnan", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/Jyothikrishnan-1.jpg" },
    { id: 10, title: "Thansil", description: "Placed as SAP Developer", imageSrc: "/Placement Stories/Thansil.jpg" },
    { id: 11, title: "Yadhukrishna", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/Yadhukrishna.jpg" },
    { id: 12, title: "Nandu Vinod", description: "Placed as SAP Associate", imageSrc: "/Placement Stories/nandu-vinod.jpg" },
    { id: 13, title: "Shilna", description: "Placed as SAP Analyst", imageSrc: "/Placement Stories/shilna.jpg" },
    { id: 14, title: "Tijo Thomas", description: "Placed as SAP Consultant", imageSrc: "/Placement Stories/tijo-thomas.jpg" },
    { id: 15, title: "Zeba Nargis", description: "Placed as SAP Associate", imageSrc: "/Placement Stories/zeba-nargis-s.jpg" }
  ];

  return (
    <section className="py-16 md:py-24 bg-black border-b border-white/5 relative z-10 overflow-hidden" id="placement">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">

        <div className="text-center mb-16 max-w-2xl">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-4 block">100% Placement Support</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Your Career is<br />Our Priority</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            From resume preparation and rigorous mock interviews, to exclusive HR training and direct scheduling with our 200+ partner companies—we support you until you are successfully placed.
          </p>
        </div>

        <div className="w-full mt-8">
          <CardStack
            items={items}
            initialIndex={0}
            autoAdvance
            intervalMs={2500}
            pauseOnHover
            showDots
            cardWidth={320}
            cardHeight={400}
          />
        </div>

      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-20 md:py-32 bg-slate-900 border border-white/10 relative overflow-hidden rounded-t-[3rem]" id="contact">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <span className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">Ready to Transform<br />Your Career?</h2>

          <div className="space-y-8 mt-4">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-black border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Direct Line</p>
                <a href="tel:+919037014410" className="text-white text-xl font-medium tracking-wide hover:text-brand-blue transition-colors">
                  +91 90370 14410
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-black border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Email Us</p>
                <a href="mailto:info@emeeducation.com" className="text-white text-xl font-medium tracking-wide hover:text-brand-blue transition-colors">
                  info@emeeducation.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form className="bg-black border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-bold text-white mb-8">Request a Callback</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input type="text" required placeholder="Full Name *" className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-5 py-4 outline-none focus:border-brand-blue/50 focus:bg-slate-900/80 transition-all font-medium" />
              <input type="email" required placeholder="Email Address *" className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-5 py-4 outline-none focus:border-brand-blue/50 focus:bg-slate-900/80 transition-all font-medium" />
            </div>
            <input type="tel" required placeholder="Mobile Number *" className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-5 py-4 mb-6 outline-none focus:border-brand-blue/50 focus:bg-slate-900/80 transition-all font-medium" />
            <select required className="w-full bg-slate-900 border border-white/10 text-slate-400 rounded-xl px-4 py-4 mb-8 outline-none focus:border-brand-blue/50 transition-all font-medium appearance-none">
              <option value="" disabled selected>Select Preferred SAP Module *</option>
              <option value="finance">SAP Finance</option>
              <option value="sales">SAP Sales</option>
              <option value="abap">SAP ABAP</option>
              <option value="procurement">SAP Sourcing & Procurement</option>
              <option value="ewm">SAP EWM</option>
            </select>
            <ShinyButton className="w-full justify-center mt-2 py-4">
              Submit Application
            </ShinyButton>
            <p className="text-xs text-slate-500 mt-6 text-center">Your privacy is respected. No spam guaranteed.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black py-12">
    <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <Image
        src="https://emeeducation.com/wp-content/uploads/2025/06/LOGO.png"
        alt="EME Education Logo"
        width={160}
        height={52}
        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
      />
      <p className="text-slate-500 text-sm font-medium">© 2025 EME Education. All rights reserved.</p>
    </div>
  </footer>
);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The Canvas Reveal Transition (Section 4)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });

  // Calculate the zoom-out scale as we reach the very bottom of the page container
  // Scale down from 1 to 0.5 to reveal the "canvas"
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    // Outer canvas that gets revealed as the inner container shrinks
    <main className="min-h-screen bg-neutral-900 overflow-x-hidden relative">

      {/* Sticky footer structure behind the scaling container */}
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-end pointer-events-none">
        <div className="w-full h-[50vh] bg-gradient-to-at-t from-black to-transparent opacity-80" />
      </div>

      <Navbar />

      {/* 
        This is the main scrollable container. 
        When the user hits the absolute bottom, this container scales down 
        to reveal the outer wrapper, creating the client's Canvas Reveal effect.
      */}
      <motion.div
        ref={containerRef}
        style={{ scale }}
        className="relative z-10 bg-black min-h-screen origin-bottom shadow-[0_0_100px_rgba(0,0,0,1)] border-b border-white/10"
      >
        <HeroVideo />
        <PartnersCarousel />
        <AboutSection />
        <CoursesSection />
        <PlacementSection />
        <FocusFeatures />
        <BentoShortsGrid />

        {/* We fade out contact specifically during the final zoom out */}
        <motion.div style={{ opacity }}>
          <ContactSection />
        </motion.div>
      </motion.div>

      {/* The actual footer stays mounted at the absolute bottom of physical scroll */}
      <div className="relative z-20 bg-black">
        <Footer />
      </div>

    </main>
  );
}
