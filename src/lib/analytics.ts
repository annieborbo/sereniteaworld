import { supabase } from '@/integrations/supabase/client';

type AnalyticsEvent = 
  | 'page_view_home'
  | 'page_view_waitlist'
  | 'waitlist_signup_complete'
  | 'waitlist_signup_success'
  | 'click_buy_theezakjes'
  | 'click_buy_losse_thee'
  | 'cta_click_shop_now';

interface EventProperties {
  format?: string | null;
  [key: string]: unknown;
}

export const trackEvent = async (
  eventName: AnalyticsEvent, 
  properties: EventProperties = {}
) => {
  try {
    await supabase
      .from('analytics_events' as 'waitlist_signups')
      .insert({ 
        event_name: eventName, 
        properties 
      } as unknown as { email: string });
  } catch (error) {
    // Silently fail - don't break UX for analytics
    console.error('Analytics error:', error);
  }
};
