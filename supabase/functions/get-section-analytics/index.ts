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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch section_time_tracking events
    const { data: events, error } = await supabase
      .from("analytics_events")
      .select("properties")
      .eq("event_name", "section_time_tracking")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    // Calculate average time per section
    const sectionTotals: Record<string, { total: number; count: number }> = {};
    let scrollDepthTotal = 0;
    let scrollDepthCount = 0;
    const milestoneReachCounts: Record<number, number> = { 25: 0, 50: 0, 75: 0, 100: 0 };

    events?.forEach((event: SectionTimeEvent) => {
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

      // Scroll depth stats
      if (typeof event.properties?.scroll_depth_max === 'number') {
        scrollDepthTotal += event.properties.scroll_depth_max;
        scrollDepthCount += 1;
      }

      // Milestone reach counts
      const milestones = event.properties?.scroll_milestones_reached;
      if (Array.isArray(milestones)) {
        milestones.forEach((m) => {
          if (milestoneReachCounts[m] !== undefined) {
            milestoneReachCounts[m] += 1;
          }
        });
      }
    });

    // Calculate averages
    const sectionAverages = Object.entries(sectionTotals).map(([section, data]) => ({
      section,
      averageTime: Math.round(data.total / data.count),
      totalVisitors: data.count,
    }));

    // Sort by page order
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

    return new Response(
      JSON.stringify({
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
