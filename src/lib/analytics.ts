import { supabase } from '@/integrations/supabase/client';

type AnalyticsEvent = 
  | 'page_view_home'
  | 'page_view_waitlist'
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

export const trackEvent = async (
  eventName: AnalyticsEvent, 
  properties: EventProperties = {}
) => {
  try {
    const utmParams = getUtmParams();
    const enrichedProperties = {
      ...properties,
      ...utmParams,
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
