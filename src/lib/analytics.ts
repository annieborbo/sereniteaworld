import { supabase } from '@/integrations/supabase/client';

type AnalyticsEvent = 
  | 'page_view_home'
  | 'page_view_waitlist'
  | 'page_exit'
  | 'cta_click_join_waitlist'
  | 'waitlist_signup_complete'
  | 'waitlist_signup_success'
  | 'click_buy_theezakjes'
  | 'click_buy_losse_thee'
  | 'cta_click_shop_now';

interface UtmParams {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

interface EventProperties {
  format?: string | null;
  [key: string]: unknown;
}

// Session tracking
let sessionStartTime: number | null = null;
let currentPage: string | null = null;
let isTrackingInitialized = false;

const getUtmParams = (): UtmParams => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
  };
};

const getTimeSpentSeconds = (): number => {
  if (!sessionStartTime) return 0;
  return Math.round((Date.now() - sessionStartTime) / 1000);
};

const sendExitEvent = () => {
  if (!currentPage || !sessionStartTime) return;
  
  const timeSpent = getTimeSpentSeconds();
  const utmParams = getUtmParams();
  
  // Use sendBeacon for reliable delivery on page exit
  const payload = {
    event_name: 'page_exit',
    properties: {
      page: currentPage,
      time_spent_seconds: timeSpent,
      ...utmParams,
      referrer: document.referrer || null,
    }
  };

  // Use sendBeacon for page exit - more reliable than fetch
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  navigator.sendBeacon(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`,
    blob
  );
};

export const initPageTracking = (pageName: string) => {
  // Record exit for previous page if exists
  if (currentPage && sessionStartTime) {
    sendExitEvent();
  }
  
  // Start new session
  sessionStartTime = Date.now();
  currentPage = pageName;
  
  // Set up exit handlers only once
  if (!isTrackingInitialized && typeof window !== 'undefined') {
    isTrackingInitialized = true;
    
    // Track when user leaves page
    window.addEventListener('beforeunload', sendExitEvent);
    
    // Track when tab becomes hidden (mobile/tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendExitEvent();
      } else if (document.visibilityState === 'visible') {
        // Reset timer when they come back
        sessionStartTime = Date.now();
      }
    });
  }
};

export const trackEvent = async (
  eventName: AnalyticsEvent, 
  properties: EventProperties = {}
) => {
  try {
    const utmParams = getUtmParams();
    const enrichedProperties = {
      ...properties,
      ...utmParams,
      time_on_page_seconds: getTimeSpentSeconds(),
      referrer: typeof document !== 'undefined' ? document.referrer : null,
    };

    await supabase
      .from('analytics_events')
      .insert({ 
        event_name: eventName, 
        properties: enrichedProperties 
      });
  } catch (error) {
    console.error('Analytics error:', error);
  }
};
