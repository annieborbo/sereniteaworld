import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SectionTiming {
  enterTime: number | null;
  totalTime: number;
}

// Global state for section timings
const sectionTimings: Map<string, SectionTiming> = new Map();
let isExitHandlerRegistered = false;
let maxScrollDepth = 0;
let scrollMilestones: Set<number> = new Set();

const calculateScrollDepth = (): number => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (scrollHeight === 0) return 100;
  return Math.round((scrollTop / scrollHeight) * 100);
};

const updateScrollDepth = () => {
  const currentDepth = calculateScrollDepth();
  if (currentDepth > maxScrollDepth) {
    maxScrollDepth = currentDepth;
  }
  
  // Track milestones (25%, 50%, 75%, 100%)
  [25, 50, 75, 100].forEach(milestone => {
    if (currentDepth >= milestone && !scrollMilestones.has(milestone)) {
      scrollMilestones.add(milestone);
    }
  });
};

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

  // Update scroll depth one final time before sending
  updateScrollDepth();

  const payload = {
    event_name: 'section_time_tracking',
    properties: {
      sections: timings,
      scroll_depth_max: maxScrollDepth,
      scroll_milestones_reached: Array.from(scrollMilestones).sort((a, b) => a - b),
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    }
  };

  // Only send if there's meaningful data
  if (Object.keys(timings).length === 0 && maxScrollDepth === 0) return;

  // Use fetch with keepalive for reliable delivery on page exit
  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`;
  
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

  // Track scroll depth on scroll
  window.addEventListener('scroll', updateScrollDepth, { passive: true });

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
