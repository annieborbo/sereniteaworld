import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ArrowLeft, MousePointer, UserPlus, TrendingUp, Clock, ScrollText, Eye, Pointer, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
interface SectionAverage {
  section: string;
  averageTime: number;
  totalVisitors: number;
}

interface ScrollDepthData {
  average: number;
  totalSessions: number;
  milestones: { milestone: number; count: number; percentage: number }[];
}

interface TrendData {
  date: string;
  page_views: number;
  cta_clicks: number;
  signups: number;
}

const CHART_COLORS = {
  theezakjes: 'hsl(165 25% 55%)',
  losse_thee: 'hsl(350 35% 70%)',
  primary: 'hsl(165 25% 55%)',
  secondary: 'hsl(350 35% 85%)',
  accent: 'hsl(42 45% 55%)',
  hero: 'hsl(165 30% 50%)',
  products: 'hsl(42 45% 55%)',
  testimonials: 'hsl(350 35% 65%)',
  about: 'hsl(200 40% 55%)',
  faq: 'hsl(280 30% 60%)',
  pageViews: 'hsl(200 60% 50%)',
  clicks: 'hsl(42 70% 50%)',
  signups: 'hsl(165 50% 45%)',
};

const chartConfig = {
  theezakjes: { label: 'Theezakjes', color: CHART_COLORS.theezakjes },
  losse_thee: { label: 'Losse Thee', color: CHART_COLORS.losse_thee },
  clicks: { label: 'Clicks', color: CHART_COLORS.clicks },
  signups: { label: 'Signups', color: CHART_COLORS.signups },
  averageTime: { label: 'Avg. Time (s)', color: CHART_COLORS.primary },
  page_views: { label: 'Page Views', color: CHART_COLORS.pageViews },
  cta_clicks: { label: 'CTA Clicks', color: CHART_COLORS.clicks },
};

const SECTION_LABELS: Record<string, string> = {
  'hero': 'Hero',
  'featured-products': 'Products',
  'testimonials': 'Reviews',
  'about': 'About',
  'faq': 'FAQ',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [sectionData, setSectionData] = useState<SectionAverage[]>([]);
  const [scrollDepth, setScrollDepth] = useState<ScrollDepthData | null>(null);
  const [waitlistCounts, setWaitlistCounts] = useState({ theezakjes: 0, losse_thee: 0, total: 0 });

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        fetchWaitlistData();
        fetchSectionAnalytics(session.access_token);
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchSectionAnalytics(session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSectionAnalytics = async (accessToken: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-section-analytics`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSectionData(data.sectionAverages || []);
        setScrollDepth(data.scrollDepth || null);
        setEventCounts(data.eventCounts || {});
        setTrends(data.trends || []);
      } else if (response.status === 401) {
        toast.error('Session expired. Please sign in again.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching section analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWaitlistData = async () => {
    try {
      const { data: signups } = await supabase
        .from('waitlist_signups')
        .select('*');

      setWaitlistCounts({
        theezakjes: signups?.filter(s => s.format === 'theezakjes').length || 0,
        losse_thee: signups?.filter(s => s.format === 'losse-thee').length || 0,
        total: signups?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching waitlist data:', error);
    }
  };

  const sectionChartData = sectionData.map(s => ({
    name: SECTION_LABELS[s.section] || s.section,
    averageTime: s.averageTime,
    visitors: s.totalVisitors,
    fill: CHART_COLORS[s.section.split('-')[0] as keyof typeof CHART_COLORS] || CHART_COLORS.primary,
  }));

  const formatPreferenceData = [
    { name: 'Theezakjes (Tea Box)', value: waitlistCounts.theezakjes, fill: CHART_COLORS.theezakjes },
    { name: 'Losse Thee (Pouch)', value: waitlistCounts.losse_thee, fill: CHART_COLORS.losse_thee },
  ];

  const totalPageViews = (eventCounts.page_view_home || 0) + (eventCounts.page_view_waitlist || 0);
  const totalClicks = (eventCounts.cta_click_shop_now || 0) + (eventCounts.cta_click_join_waitlist || 0) + 
                      (eventCounts.click_buy_theezakjes || 0) + (eventCounts.click_buy_losse_thee || 0);

  // Show authentication required message
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <LogIn className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access the analytics dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link to="/" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Complete visitor analytics & conversion tracking</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading || isAuthenticated === null ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Traffic KPI Cards */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Traffic Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPageViews}</div>
                    <p className="text-xs text-muted-foreground">Home: {eventCounts.page_view_home || 0} | Waitlist: {eventCounts.page_view_waitlist || 0}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CTA Clicks</CardTitle>
                    <Pointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalClicks}</div>
                    <p className="text-xs text-muted-foreground">All button interactions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Scroll Depth</CardTitle>
                    <ScrollText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{scrollDepth?.average || 0}%</div>
                    <p className="text-xs text-muted-foreground">{scrollDepth?.totalSessions || 0} sessions tracked</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalPageViews > 0 ? ((waitlistCounts.total / totalPageViews) * 100).toFixed(1) : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Page views → Signups</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Waitlist KPI Cards */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Waitlist Signups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{waitlistCounts.total}</div>
                    <p className="text-xs text-muted-foreground">Waitlist registrations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Theezakjes Signups</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{waitlistCounts.theezakjes}</div>
                    <p className="text-xs text-muted-foreground">
                      {waitlistCounts.total > 0 ? ((waitlistCounts.theezakjes / waitlistCounts.total) * 100).toFixed(1) : 0}% of total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Losse Thee Signups</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{waitlistCounts.losse_thee}</div>
                    <p className="text-xs text-muted-foreground">
                      {waitlistCounts.total > 0 ? ((waitlistCounts.losse_thee / waitlistCounts.total) * 100).toFixed(1) : 0}% of total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">No Format</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{waitlistCounts.total - waitlistCounts.theezakjes - waitlistCounts.losse_thee}</div>
                    <p className="text-xs text-muted-foreground">Direct waitlist signups</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 7-Day Trends Chart */}
            {trends.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>7-Day Activity Trends</CardTitle>
                  <CardDescription>Page views and CTA clicks over the last week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={trends}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="page_views" 
                        stroke={CHART_COLORS.pageViews} 
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.pageViews }}
                        name="Page Views"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cta_clicks" 
                        stroke={CHART_COLORS.clicks} 
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.clicks }}
                        name="CTA Clicks"
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Format Preference Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Format Preference</CardTitle>
                  <CardDescription>Distribution of signups by product format</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={formatPreferenceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {formatPreferenceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Section Time Chart */}
              {sectionChartData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Average Time per Section</CardTitle>
                    <CardDescription>How long visitors spend viewing each section (in seconds)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={sectionChartData} layout="vertical">
                        <XAxis type="number" unit="s" />
                        <YAxis type="category" dataKey="name" width={80} />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                  <p className="font-semibold">{data.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Avg. time: <span className="font-medium text-foreground">{data.averageTime}s</span>
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Visitors: <span className="font-medium text-foreground">{data.visitors}</span>
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                        <Bar 
                          dataKey="averageTime" 
                          radius={[0, 4, 4, 0]}
                          fill={CHART_COLORS.primary}
                        >
                          {sectionChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Scroll Depth Milestones */}
            {scrollDepth && scrollDepth.milestones.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Scroll Depth Milestones</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scrollDepth.milestones.map((m) => (
                    <Card key={m.milestone}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{m.milestone}% Reached</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{m.percentage}%</div>
                        <p className="text-xs text-muted-foreground">{m.count} visitors</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Events Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Event Counts</CardTitle>
                <CardDescription>Complete breakdown of tracked analytics events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Event Name</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(eventCounts)
                        .sort(([,a], [,b]) => b - a)
                        .map(([eventName, count]) => (
                          <tr key={eventName} className="border-b border-border">
                            <td className="py-3 px-4 font-mono text-sm">{eventName}</td>
                            <td className="text-right py-3 px-4 font-semibold">{count}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
