'use client';

import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReviewSummaryCardProps {
    rating: number;
    reviewCount: number;
    maxRating?: number;
    summaryText: string;
    className?: string;
}

export const ReviewSummaryCard: React.FC<ReviewSummaryCardProps> = ({
    rating,
    reviewCount,
    maxRating = 5,
    summaryText,
    className,
}) => {
    const ratingRef = useRef<HTMLSpanElement>(null);
    const reviewCountRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ratingControl = animate(0, rating, {
            duration: 1.5,
            ease: 'easeOut',
            onUpdate(value) {
                if (ratingRef.current) {
                    ratingRef.current.textContent = value.toFixed(1);
                }
            },
        });

        const reviewCountControl = animate(0, reviewCount, {
            duration: 1.5,
            ease: 'easeOut',
            onUpdate(value) {
                if (reviewCountRef.current) {
                    reviewCountRef.current.textContent = new Intl.NumberFormat('en-US').format(
                        Math.round(value)
                    );
                }
            },
        });

        return () => {
            ratingControl.stop();
            reviewCountControl.stop();
        };
    }, [rating, reviewCount]);

    const cardVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            } as any
        },
    };

    const starVariants: any = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.2 + i * 0.1,
                duration: 0.4,
                ease: 'easeOut',
            } as any,
        }),
    };

    return (
        <motion.div
            className={cn(
                'w-full max-w-sm rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-md p-8 text-center shadow-[0_0_30px_rgba(198,108,44,0.15)]',
                'flex flex-col items-center justify-center relative overflow-hidden',
                className
            )}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            aria-label={`Rating: ${rating} out of ${maxRating} based on ${reviewCount} reviews.`}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-1.5 z-10 relative">
                {Array.from({ length: maxRating }, (_, i) => (
                    <motion.div key={i} custom={i} variants={starVariants}>
                        <Star
                            className={cn(
                                'h-8 w-8 drop-shadow-md transition-all',
                                rating >= i + 1 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700 fill-slate-800'
                            )}
                        />
                    </motion.div>
                ))}
            </div>

            <h2 className="mt-6 text-5xl font-extrabold tracking-tight text-white z-10 relative flex items-baseline justify-center gap-3">
                <span ref={ratingRef} className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-brand-orange">0.0</span>
                <span className="text-2xl font-semibold text-slate-400 tracking-normal">
                    / {maxRating}
                </span>
            </h2>

            <p className="mt-4 text-[15px] font-medium text-slate-300 z-10 relative uppercase tracking-widest">
                {summaryText.split(' ').map((word, i) => {
                    if (word === '420+') {
                        return <span key={i} className="text-white font-bold mx-1"><span ref={reviewCountRef}>0</span>+</span>
                    }
                    return <span key={i} className="mx-1">{word}</span>
                })}
            </p>
        </motion.div>
    );
};
