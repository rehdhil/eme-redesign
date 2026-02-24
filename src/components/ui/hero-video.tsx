'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ShootingStars } from '@/components/ui/shooting-stars';

export default function HeroVideo() {
    const containerRef = useRef<HTMLElement>(null);

    // Track scroll progress within this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Scale down from 1 (100%) to 0.6 (60%) as the user scrolls past the hero
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

    // Fade out the text faster than the video scales
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black pt-32 pb-20 overflow-hidden"
        >
            {/* Dynamic Shooting Stars Background */}
            <ShootingStars
                starColor="#FFFFFF"
                trailColor="#2C86C6" // EME Brand Blue Hex
                minSpeed={15}
                maxSpeed={35}
                minDelay={1200}
                maxDelay={3000}
            />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-6 md:px-10">

                {/* Animated Brand Headline */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="flex flex-col items-center justify-center text-center z-10 mb-8 mt-12"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-2 backdrop-blur-md mb-6">
                        <span className="h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(44,134,198,0.8)] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                            Kerala&apos;s #1 SAP Training Institute
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-8 sm:text-6xl md:text-7xl">
                        Best SAP Training Institute in Kerala <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-300">
                            Get Certified with Placement Support
                        </span>
                    </h1>
                </motion.div>

                {/* Scroll-Linked Scaling Video Container */}
                <motion.div
                    style={{ scale }}
                    className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(44,134,198,0.25)] border border-brand-blue/30 bg-black/50 z-20 origin-top mb-12"
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/gcnbRe6OjWw?autoplay=1&mute=1&loop=1&playlist=gcnbRe6OjWw"
                        title="EME Education Overview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full object-cover"
                    ></iframe>

                    {/* Subtle brand blue glow behind the video */}
                    <div className="absolute -inset-10 -z-10 bg-brand-blue/20 blur-[120px] rounded-full"></div>
                </motion.div>

                {/* Sub-headline and CTA Button below video */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center justify-center text-center z-10"
                >
                    <p className="max-w-3xl text-center text-lg md:text-xl font-light leading-relaxed tracking-wide text-slate-300 mb-8">
                        Join EME Education, a leading SAP training institute offering job-oriented SAP courses with real-time projects and dedicated placement assistance.
                    </p>

                    <ShinyButton href="#contact">
                        Enroll Now
                    </ShinyButton>
                </motion.div>

            </div>
        </section>
    );
}
