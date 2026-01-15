import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { dashboardService } from '@/lib/api';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';
import type { DashboardStats } from '@/lib/api';
import { 
  Map, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Fallback mock data when backend is not connected
const mockStats: DashboardStats = {
  totalBookings: 156,
  newLeadsToday: 12,
  activeServices: 8,
  activeTours: 24,
  recentBookings: [
    { 
      _id: '1', 
      customerName: 'John Doe', 
      phone: '+91 9876543210',
      serviceType: 'tour',
      serviceName: 'Kashmir Valley Explorer', 
      pickupLocation: 'Aurangabad',
      date: '2024-01-15', 
      vehicleType: 'SUV',
      passengers: 4,
      status: 'CONFIRMED',
      source: 'WEBSITE',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    },
    { 
      _id: '2', 
      customerName: 'Jane Smith', 
      phone: '+91 9876543211',
      serviceType: 'tour',
      serviceName: 'Goa Beach Paradise', 
      pickupLocation: 'Mumbai',
      date: '2024-01-14', 
      vehicleType: 'Sedan',
      passengers: 2,
      status: 'NEW',
      source: 'WHATSAPP',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-09'
    },
    { 
      _id: '3', 
      customerName: 'Mike Johnson', 
      phone: '+91 9876543212',
      serviceType: 'tour',
      serviceName: 'Kerala Backwaters', 
      pickupLocation: 'Pune',
      date: '2024-01-13', 
      vehicleType: 'Tempo',
      passengers: 8,
      status: 'CONTACTED',
      source: 'FORM',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
  ],
};

const statCards = [
  {
    title: 'Active Tours',
    icon: Map,
    key: 'activeTours' as const,
    change: '+3 this month',
    trend: 'up' as const,
  },
  {
    title: 'Total Bookings',
    icon: Calendar,
    key: 'totalBookings' as const,
    change: '+18 this week',
    trend: 'up' as const,
  },
  {
    title: 'Active Services',
    icon: DollarSign,
    key: 'activeServices' as const,
    change: 'All running',
    trend: 'up' as const,
  },
  {
    title: 'New Leads Today',
    icon: Users,
    key: 'newLeadsToday' as const,
    change: 'Needs attention',
    trend: 'up' as const,
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: 'bg-accent/20 text-accent-foreground border border-accent/30',
    CONTACTED: 'bg-info/10 text-info border border-info/30',
    CONFIRMED: 'bg-primary/10 text-primary border border-primary/30',
    COMPLETED: 'bg-muted text-muted-foreground border border-border',
    CANCELLED: 'bg-destructive/10 text-destructive border border-destructive/30',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.NEW}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    setError(null);

    try {
      // Use mock API if enabled, otherwise try real API
      if (USE_MOCK_API) {
        const data = await mockApiService.dashboard.getStats();
        setStats(data);
      } else {
        const data = await dashboardService.getStats();
        setStats(data);
      }
    } catch (err) {
      // Fallback to mock data if backend is not available
      console.warn('Backend not available, using mock data');
      try {
        const data = await mockApiService.dashboard.getStats();
        setStats(data);
      } catch {
        setStats(mockStats);
      }
      if (showRefreshing) {
        setError('Could not connect to backend. Showing demo data.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchDashboardData(true)}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                  ) : (
                    stats[stat.key]
                  )}
                </div>
                <p className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-primary" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Service/Tour</th>
                    <th className="pb-3 font-medium">Pickup</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        {Array.from({ length: 6 }).map((_, j) => (
                          <td key={j} className="py-3">
                            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    stats.recentBookings.map((booking) => (
                      <tr key={booking._id} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="text-sm font-medium">{booking.customerName}</div>
                          <div className="text-xs text-muted-foreground">{booking.phone}</div>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">{booking.serviceName}</td>
                        <td className="py-3 text-sm text-muted-foreground">{booking.pickupLocation}</td>
                        <td className="py-3 text-sm text-muted-foreground">{booking.date}</td>
                        <td className="py-3">
                          <span className="inline-flex rounded bg-muted px-2 py-0.5 text-xs font-medium">
                            {booking.source}
                          </span>
                        </td>
                        <td className="py-3">
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
