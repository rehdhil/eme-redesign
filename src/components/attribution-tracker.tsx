'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { captureAttribution } from '@/lib/attribution';

function TrackerContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        // Pass the raw query string instead of relying on window.location
        // to avoid hydration timing bugs where window.location.search is initially empty
        captureAttribution(searchParams.toString());
    }, [searchParams]);

    return null;
}

export function AttributionTracker() {
    return (
        <Suspense fallback={null}>
            <TrackerContent />
        </Suspense>
    );
}
