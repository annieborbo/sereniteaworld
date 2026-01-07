import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Eye, MousePointer, UserPlus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AnalyticsEvent {
  id: string;
  event_name: string;
  properties: { format?: string } | null;
  created_at: string;
}

interface EventCounts {
  page_view_home: number;
  page_view_waitlist: number;
  click_buy_theezakjes: number;
  click_buy_losse_thee: number;
  cta_click_shop_now: number;
  waitlist_signup_complete_theezakjes: number;
  waitlist_signup_complete_losse_thee: number;
  waitlist_signup_success: number;
}

const CHART_COLORS = {
  theezakjes: 'hsl(165 25% 55%)',
  losse_thee: 'hsl(350 35% 70%)',
  primary: 'hsl(165 25% 55%)',
  secondary: 'hsl(350 35% 85%)',
  accent: 'hsl(42 45% 55%)',
};

const chartConfig = {
  theezakjes: { label: 'Theezakjes', color: CHART_COLORS.theezakjes },
  losse_thee: { label: 'Losse Thee', color: CHART_COLORS.losse_thee },
  clicks: { label: 'Clicks', color: CHART_COLORS.primary },
  signups: { label: 'Signups', color: CHART_COLORS.accent },
};

const AdminDashboard = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<EventCounts>({
    page_view_home: 0,
    page_view_waitlist: 0,
    click_buy_theezakjes: 0,
    click_buy_losse_thee: 0,
    cta_click_shop_now: 0,
    waitlist_signup_complete_theezakjes: 0,
    waitlist_signup_complete_losse_thee: 0,
    waitlist_signup_success: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Note: This requires admin access - RLS blocks public reads
      // For now, we'll calculate from waitlist_signups which has similar data
      const { data: signups } = await supabase
        .from('waitlist_signups')
        .select('*');

      // Since analytics_events isn't readable, we'll show waitlist data
      // In production, you'd use a service role or edge function
      const signupCounts = {
        theezakjes: signups?.filter(s => s.format === 'theezakjes').length || 0,
        losse_thee: signups?.filter(s => s.format === 'losse-thee').length || 0,
        total: signups?.length || 0,
      };

      setCounts(prev => ({
        ...prev,
        waitlist_signup_complete_theezakjes: signupCounts.theezakjes,
        waitlist_signup_complete_losse_thee: signupCounts.losse_thee,
        waitlist_signup_success: signupCounts.total,
      }));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPreferenceData = [
    { name: 'Theezakjes (Tea Box)', value: counts.waitlist_signup_complete_theezakjes, fill: CHART_COLORS.theezakjes },
    { name: 'Losse Thee (Pouch)', value: counts.waitlist_signup_complete_losse_thee, fill: CHART_COLORS.losse_thee },
  ];

  const conversionData = [
    { 
      name: 'Theezakjes', 
      clicks: counts.click_buy_theezakjes, 
      signups: counts.waitlist_signup_complete_theezakjes,
    },
    { 
      name: 'Losse Thee', 
      clicks: counts.click_buy_losse_thee, 
      signups: counts.waitlist_signup_complete_losse_thee,
    },
  ];

  const totalSignups = counts.waitlist_signup_complete_theezakjes + counts.waitlist_signup_complete_losse_thee;

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
            <p className="text-sm text-muted-foreground">Smoke test metrics & conversion tracking</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSignups}</div>
                  <p className="text-xs text-muted-foreground">Waitlist registrations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Theezakjes Signups</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.waitlist_signup_complete_theezakjes}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalSignups > 0 ? ((counts.waitlist_signup_complete_theezakjes / totalSignups) * 100).toFixed(1) : 0}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Losse Thee Signups</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.waitlist_signup_complete_losse_thee}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalSignups > 0 ? ((counts.waitlist_signup_complete_losse_thee / totalSignups) * 100).toFixed(1) : 0}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalSignups > 0 ? ((counts.waitlist_signup_success / totalSignups) * 100).toFixed(0) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Completed signups</p>
                </CardContent>
              </Card>
            </div>

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

              {/* Signups by Format Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Signups by Format</CardTitle>
                  <CardDescription>Comparing demand between formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={conversionData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="signups" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle>Summary Metrics</CardTitle>
                <CardDescription>Key performance indicators for your smoke test</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Metric</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Value</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">% of Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Total Waitlist Signups</td>
                        <td className="text-right py-3 px-4 font-semibold">{totalSignups}</td>
                        <td className="text-right py-3 px-4">100%</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Theezakjes (Tea Box)</td>
                        <td className="text-right py-3 px-4 font-semibold">{counts.waitlist_signup_complete_theezakjes}</td>
                        <td className="text-right py-3 px-4">
                          {totalSignups > 0 ? ((counts.waitlist_signup_complete_theezakjes / totalSignups) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Losse Thee (Tea Pouch)</td>
                        <td className="text-right py-3 px-4 font-semibold">{counts.waitlist_signup_complete_losse_thee}</td>
                        <td className="text-right py-3 px-4">
                          {totalSignups > 0 ? ((counts.waitlist_signup_complete_losse_thee / totalSignups) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Note about analytics access */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Full analytics events (page views, clicks) require admin access. 
                  This dashboard currently shows waitlist signup data. For complete analytics, 
                  query the <code className="bg-amber-100 px-1 rounded">analytics_events</code> table 
                  using the service role key.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
