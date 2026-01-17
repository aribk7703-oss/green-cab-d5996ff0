import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { dashboardService } from '@/lib/api';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';
import type { DashboardStats } from '@/lib/api';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Map, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight,
  RefreshCw,
  Loader2,
  AlertCircle,
  ShoppingCart,
  Gift,
  Zap,
  ChevronRight
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
    title: 'REVENUE',
    subtitle: 'Total revenue',
    icon: ShoppingCart,
    key: 'totalBookings' as const,
    prefix: '₹',
    multiplier: 1500,
    bgColor: 'bg-violet-500',
    iconBg: 'bg-violet-400/30',
  },
  {
    title: 'EARNING',
    subtitle: 'Total Earning',
    icon: Gift,
    key: 'newLeadsToday' as const,
    prefix: '₹',
    multiplier: 2500,
    bgColor: 'bg-pink-500',
    iconBg: 'bg-pink-400/30',
  },
  {
    title: 'BOOKINGS',
    subtitle: 'Total bookings',
    icon: Calendar,
    key: 'totalBookings' as const,
    prefix: '',
    multiplier: 1,
    bgColor: 'bg-cyan-500',
    iconBg: 'bg-cyan-400/30',
  },
  {
    title: 'SERVICES',
    subtitle: 'Total bookable services',
    icon: Zap,
    key: 'activeServices' as const,
    prefix: '',
    multiplier: 1,
    bgColor: 'bg-emerald-500',
    iconBg: 'bg-emerald-400/30',
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
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    setError(null);

    try {
      if (USE_MOCK_API) {
        const data = await mockApiService.dashboard.getStats();
        setStats(data);
      } else {
        const data = await dashboardService.getStats();
        setStats(data);
      }
    } catch (err) {
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
        {/* Welcome Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold uppercase text-foreground">
              Welcome {user?.email || 'Admin'}!
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your business today.</p>
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

        {/* Colored Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className={`${stat.bgColor} border-0 text-white shadow-lg`}>
              <CardContent className="relative overflow-hidden p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
                      {stat.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold">
                      {isLoading ? (
                        <span className="inline-block h-9 w-20 animate-pulse rounded bg-white/20" />
                      ) : (
                        `${stat.prefix}${((stats[stat.key] || 0) * stat.multiplier).toLocaleString()}`
                      )}
                    </p>
                    <p className="mt-1 text-sm opacity-80">{stat.subtitle}</p>
                  </div>
                  <div className={`rounded-full ${stat.iconBg} p-3`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Bookings */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Bookings
              </CardTitle>
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  More <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">#</th>
                      <th className="pb-3 font-medium">Item</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i} className="border-b">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <td key={j} className="py-3">
                              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : stats.recentBookings.length > 0 ? (
                      stats.recentBookings.map((booking, index) => (
                        <tr key={booking._id} className="border-b last:border-0">
                          <td className="py-3 text-sm text-muted-foreground">{index + 1}</td>
                          <td className="py-3">
                            <div className="text-sm font-medium">{booking.serviceName}</div>
                            <div className="text-xs text-muted-foreground">{booking.customerName}</div>
                          </td>
                          <td className="py-3 text-sm font-medium">₹{(Math.random() * 10000 + 5000).toFixed(0)}</td>
                          <td className="py-3">
                            <StatusBadge status={booking.status} />
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">{booking.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/tours/create" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Map className="h-4 w-4 text-primary" />
                  Add New Tour
                </Button>
              </Link>
              <Link to="/admin/bookings" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  View All Bookings
                </Button>
              </Link>
              <Link to="/admin/services" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Manage Services
                </Button>
              </Link>
              <Link to="/admin/settings" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Payment Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
