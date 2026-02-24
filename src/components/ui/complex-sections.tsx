'use client';

import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ReviewSummaryCard } from '@/components/ui/card-2';
import { ShinyButton } from '@/components/ui/shiny-button';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { Users, Briefcase, ShieldCheck, GraduationCap, Settings, MonitorPlay } from 'lucide-react';

// --- Section 2: Feature Showcase (Simplified displaying DisplayCards) ---
export function FocusFeatures() {
    const timelineData = [
        {
            id: 1,
            title: "1000+ Students",
            date: "Proven Track Record",
            content: "We have successfully trained over 1000 students across India, providing them with elite SAP expertise and practical knowledge.",
            category: "Excellence",
            icon: Users,
            relatedIds: [2, 4],
            status: "completed" as const,
            energy: 95,
        },
        {
            id: 2,
            title: "200+ Placements",
            date: "Class of 2025",
            content: "Already 200+ students secured high-paying roles in top MNCs in the year 2025 alone, demonstrating our placement strength.",
            category: "Success",
            icon: Briefcase,
            relatedIds: [1, 3],
            status: "completed" as const,
            energy: 100,
        },
        {
            id: 3,
            title: "5 Interviews",
            date: "Guarantee",
            content: "Our strong placement support team guarantees at least 5 interviews for every graduate, ensuring multiple opportunities.",
            category: "Placement",
            icon: ShieldCheck,
            relatedIds: [2, 5],
            status: "completed" as const,
            energy: 90,
        },
        {
            id: 4,
            title: "Industry Experts",
            date: "Expert Mentors",
            content: "Learn from certified SAP veterans with years of real-world implementation experience in global corporate environments.",
            category: "Training",
            icon: GraduationCap,
            relatedIds: [1, 5],
            status: "completed" as const,
            energy: 95,
        },
        {
            id: 5,
            title: "Practical Focus",
            date: "Industry Oriented",
            content: "100% focused on practical, project-based learning to make you business-ready from day one with hands-on labs.",
            category: "Practical",
            icon: Settings,
            relatedIds: [3, 4, 6],
            status: "completed" as const,
            energy: 85,
        },
        {
            id: 6,
            title: "Flexible Classes",
            date: "Online & Offline",
            content: "Choose between interactive online sessions or hands-on offline classes at our centers as per your schedule and comfort.",
            category: "Flexible",
            icon: MonitorPlay,
            relatedIds: [5],
            status: "completed" as const,
            energy: 80,
        },
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden" id="about">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-blue)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-12">
                    <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-4 block">Our Unique Edge</span>
                    <h2 className="text-3xl md:text-6xl font-extrabold text-white tracking-tighter mb-6">Why Choose EME?</h2>
                </div>

                <div className="relative mb-20">
                    <RadialOrbitalTimeline timelineData={timelineData} />
                </div>

                <div className="mt-16 flex justify-center w-full">
                    <ReviewSummaryCard
                        rating={4.6}
                        reviewCount={420}
                        summaryText="Google Reviews 420+"
                    />
                </div>
            </div>
        </section>
    );
}


export function BentoShortsGrid() {
    const shorts = [
        { src: "https://www.youtube.com/embed/PIVdJysqwuE" },
        { src: "https://www.youtube.com/embed/sGvi2cqxFBI" },
        { src: "https://www.youtube.com/embed/gZ9zdpDYw0U" },
        { src: "https://www.youtube.com/embed/YdsG2wP_J5Y" },
        { src: "https://www.youtube.com/embed/bZs04PlPcjo" },
        { src: "https://www.youtube.com/embed/vm-v7rc_7YQ" }
    ];

    const gridVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Staggered cascade effect
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 }, // Slides up from 40px below
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-24 md:py-32 bg-black relative" id="success-stories">
            <div className="max-w-7xl mx-auto px-6 md:px-10">

                {/* Subtle Brand Blue backlight glow for the grid */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <div className="text-center mb-16 relative z-10">
                    <span className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-4 block">100% Placement Support</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your Career is <br />Our Priority</h2>
                </div>

                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }} // Triggers slightly before entering fully
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10"
                >
                    {shorts.map((short, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-brand-blue/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group hover:border-brand-blue hover:shadow-[0_0_30px_rgba(44,134,198,0.2)] transition-all duration-300"
                        >
                            {/* 1px gradient border effect via a pseudo-element layering trick */}
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/40 to-transparent pointer-events-none opacity-50"></div>

                            <iframe
                                width="100%"
                                height="100%"
                                src={short.src}
                                title={`Placement Story ${i + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full z-10"
                            ></iframe>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-20 flex justify-center relative z-10">
                    <ShinyButton href="#contact">
                        Enroll Now
                    </ShinyButton>
                </div>
            </div>
        </section>
    );
}
