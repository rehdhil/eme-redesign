export const ATTRIBUTION_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'lead_channel',
] as const;

export type AttributionData = Partial<Record<typeof ATTRIBUTION_KEYS[number], string>>;

const STORAGE_KEY = 'eme_lead_attribution';

export function captureAttribution(queryString?: string) {
    if (typeof window === 'undefined') return;

    const rawQuery = queryString || window.location.search;
    const urlParams = new URLSearchParams(rawQuery);
    const currentAttribution: AttributionData = {};
    let hasNewData = false;

    ATTRIBUTION_KEYS.forEach((key) => {
        const value = urlParams.get(key);
        if (value) {
            currentAttribution[key] = value;
            hasNewData = true;
        }
    });

    // Derive lead channel
    if (currentAttribution.fbclid || currentAttribution.utm_source?.includes('facebook') || currentAttribution.utm_source?.includes('fb') || currentAttribution.utm_source?.includes('ig')) {
        currentAttribution.lead_channel = 'Meta Ads';
    } else if (currentAttribution.gclid || currentAttribution.utm_source?.includes('google')) {
        currentAttribution.lead_channel = 'Google Ads';
    } else if (currentAttribution.utm_source) {
        currentAttribution.lead_channel = currentAttribution.utm_source;
    } else {
        currentAttribution.lead_channel = 'Organic/Direct';
    }

    if (hasNewData) {
        try {
            // Merge with existing data so a user who navigates away and back 
            // without UTMs still retains their original attribution.
            const existingData = getAttribution();
            const mergedData = { ...existingData, ...currentAttribution };

            // Recalculate lead_channel on the merged set to ensure it's accurate
            if (mergedData.fbclid || mergedData.utm_source?.includes('facebook') || mergedData.utm_source?.includes('fb') || mergedData.utm_source?.includes('ig')) {
                mergedData.lead_channel = 'Meta Ads';
            } else if (mergedData.gclid || mergedData.utm_source?.includes('google')) {
                mergedData.lead_channel = 'Google Ads';
            } else if (mergedData.utm_source) {
                mergedData.lead_channel = mergedData.utm_source;
            } else {
                mergedData.lead_channel = 'Organic/Direct';
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
        } catch (e) {
            console.error('Failed to save attribution data:', e);
        }
    }
}

export function getAttribution(): AttributionData {
    if (typeof window === 'undefined') return {};

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Failed to parse attribution data:', e);
        return {};
    }
}
