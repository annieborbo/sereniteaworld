import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SectionTiming {
  enterTime: number | null;
  totalTime: number;
}

// Global state for section timings
const sectionTimings: Map<string, SectionTiming> = new Map();
let isExitHandlerRegistered = false;

const sendSectionTimings = () => {
  const timings: Record<string, number> = {};
  
  sectionTimings.forEach((timing, sectionId) => {
    let total = timing.totalTime;
    // If section is currently visible, add time since last enter
    if (timing.enterTime !== null) {
      total += Date.now() - timing.enterTime;
    }
    timings[sectionId] = Math.round(total / 1000); // Convert to seconds
  });

  if (Object.keys(timings).length === 0) return;

  const payload = {
    event_name: 'section_time_tracking',
    properties: {
      sections: timings,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    }
  };

  // Use sendBeacon with proper headers for Supabase
  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`;
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  
  // sendBeacon doesn't support headers, so we use fetch with keepalive as fallback
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {
    // Fallback to supabase client (may not complete on page exit)
    supabase.from('analytics_events').insert(payload);
  });
};

const registerExitHandler = () => {
  if (isExitHandlerRegistered || typeof window === 'undefined') return;
  isExitHandlerRegistered = true;

  window.addEventListener('beforeunload', sendSectionTimings);
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendSectionTimings();
      // Reset all section enter times
      sectionTimings.forEach((timing) => {
        if (timing.enterTime !== null) {
          timing.totalTime += Date.now() - timing.enterTime;
          timing.enterTime = null;
        }
      });
    }
  });
};

export const useSectionTracking = (sectionId: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      let timing = sectionTimings.get(sectionId);
      
      if (!timing) {
        timing = { enterTime: null, totalTime: 0 };
        sectionTimings.set(sectionId, timing);
      }

      if (entry.isIntersecting) {
        // Section became visible
        if (timing.enterTime === null) {
          timing.enterTime = Date.now();
        }
      } else {
        // Section left viewport
        if (timing.enterTime !== null) {
          timing.totalTime += Date.now() - timing.enterTime;
          timing.enterTime = null;
        }
      }
    });
  }, [sectionId]);

  useEffect(() => {
    registerExitHandler();
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // 30% visible to count as "viewing"
      rootMargin: '0px'
    });

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleIntersection]);

  return sectionRef;
};
