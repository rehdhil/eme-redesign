export const ATTRIBUTION_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
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

    if (hasNewData) {
        try {
            // Merge with existing data so a user who navigates away and back 
            // without UTMs still retains their original attribution.
            const existingData = getAttribution();
            const mergedData = { ...existingData, ...currentAttribution };
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
