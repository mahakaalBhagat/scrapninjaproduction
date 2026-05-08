export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: 'event', eventName: string, params?: AnalyticsParams) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const scopedWindow = window as Window & { gtag?: GtagFn };
  return scopedWindow.gtag ?? null;
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag('event', eventName, params);
}

export function trackClick(eventName: string, params?: AnalyticsParams): void {
  trackEvent(eventName, {
    event_category: 'engagement',
    ...params,
  });
}
