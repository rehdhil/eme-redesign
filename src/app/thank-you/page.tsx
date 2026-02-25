import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center">
                {/* Animated Checkmark Wrapper */}
                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-[pulse_3s_ease-in-out_infinite]">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Thank You!
                </h1>

                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
                    Your application has been received successfully. One of our career counselors will contact you shortly to guide you through the next steps in your SAP journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                    <ShinyButton href="/" className="w-full sm:w-auto flex items-center justify-center py-3">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </ShinyButton>
                </div>
            </div>

            {/* Subtle branding at the bottom */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
                <p className="text-slate-600 text-sm font-medium">© 2025 EME Education</p>
            </div>
        </main>
    );
}
