import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SectionTimeEvent {
  properties: {
    sections?: Record<string, number>;
    scroll_depth_max?: number;
    scroll_milestones_reached?: number[];
  };
}

interface AnalyticsEvent {
  event_name: string;
  properties: Record<string, unknown> | null;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify the user's JWT token
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);

    if (claimsError || !claimsData?.claims) {
      console.error("JWT verification failed:", claimsError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    // Use service role for data access (analytics_events is protected by RLS)
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch all analytics events
    const { data: allEvents, error: allEventsError } = await supabase
      .from("analytics_events")
      .select("event_name, properties, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (allEventsError) throw allEventsError;

    // Count events by type
    const eventCounts: Record<string, number> = {};
    allEvents?.forEach((event: AnalyticsEvent) => {
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
    });

    // Get events by day for trend chart (last 7 days)
    const now = new Date();
    const dailyTrends: Record<string, Record<string, number>> = {};
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dailyTrends[dateKey] = { page_views: 0, cta_clicks: 0, signups: 0 };
    }

    allEvents?.forEach((event: AnalyticsEvent) => {
      const dateKey = event.created_at.split('T')[0];
      if (dailyTrends[dateKey]) {
        if (event.event_name.startsWith('page_view')) {
          dailyTrends[dateKey].page_views += 1;
        } else if (event.event_name.includes('click')) {
          dailyTrends[dateKey].cta_clicks += 1;
        } else if (event.event_name.includes('signup')) {
          dailyTrends[dateKey].signups += 1;
        }
      }
    });

    const trendsArray = Object.entries(dailyTrends).map(([date, counts]) => ({
      date,
      ...counts,
    }));

    // Section time tracking
    const sectionEvents = allEvents?.filter(
      (e: AnalyticsEvent) => e.event_name === 'section_time_tracking'
    ) || [];

    const sectionTotals: Record<string, { total: number; count: number }> = {};
    let scrollDepthTotal = 0;
    let scrollDepthCount = 0;
    const milestoneReachCounts: Record<number, number> = { 25: 0, 50: 0, 75: 0, 100: 0 };

    sectionEvents.forEach((event: SectionTimeEvent) => {
      const sections = event.properties?.sections;
      if (sections) {
        Object.entries(sections).forEach(([section, time]) => {
          if (!sectionTotals[section]) {
            sectionTotals[section] = { total: 0, count: 0 };
          }
          sectionTotals[section].total += time;
          sectionTotals[section].count += 1;
        });
      }

      if (typeof event.properties?.scroll_depth_max === 'number') {
        scrollDepthTotal += event.properties.scroll_depth_max;
        scrollDepthCount += 1;
      }

      const milestones = event.properties?.scroll_milestones_reached;
      if (Array.isArray(milestones)) {
        milestones.forEach((m) => {
          if (milestoneReachCounts[m] !== undefined) {
            milestoneReachCounts[m] += 1;
          }
        });
      }
    });

    const sectionAverages = Object.entries(sectionTotals).map(([section, data]) => ({
      section,
      averageTime: Math.round(data.total / data.count),
      totalVisitors: data.count,
    }));

    const sectionOrder = ['hero', 'featured-products', 'testimonials', 'about', 'faq'];
    sectionAverages.sort((a, b) => {
      const aIndex = sectionOrder.indexOf(a.section);
      const bIndex = sectionOrder.indexOf(b.section);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    const avgScrollDepth = scrollDepthCount > 0 
      ? Math.round(scrollDepthTotal / scrollDepthCount) 
      : 0;

    const milestonePercentages = Object.entries(milestoneReachCounts).map(([milestone, count]) => ({
      milestone: parseInt(milestone),
      count,
      percentage: scrollDepthCount > 0 ? Math.round((count / scrollDepthCount) * 100) : 0,
    }));

    console.log("Analytics fetched successfully for user:", userId, {
      totalEvents: allEvents?.length,
      eventTypes: Object.keys(eventCounts).length,
      sectionSessions: sectionEvents.length,
    });

    return new Response(
      JSON.stringify({
        eventCounts,
        trends: trendsArray,
        sectionAverages,
        scrollDepth: {
          average: avgScrollDepth,
          totalSessions: scrollDepthCount,
          milestones: milestonePercentages,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
