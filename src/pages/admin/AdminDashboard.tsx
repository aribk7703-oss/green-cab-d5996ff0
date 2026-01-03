import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTours } from '@/contexts/ToursContext';
import { 
  Map, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock booking data for dashboard
const mockStats = {
  totalBookings: 156,
  pendingBookings: 12,
  totalRevenue: 245680,
  monthlyGrowth: 12.5,
  recentBookings: [
    { id: '1', customer: 'John Doe', tour: 'Kashmir Valley Explorer', date: '2024-01-15', amount: 45999, status: 'confirmed' },
    { id: '2', customer: 'Jane Smith', tour: 'Goa Beach Paradise', date: '2024-01-14', amount: 28999, status: 'pending' },
    { id: '3', customer: 'Mike Johnson', tour: 'Kerala Backwaters', date: '2024-01-13', amount: 35999, status: 'confirmed' },
    { id: '4', customer: 'Sarah Williams', tour: 'Rajasthan Heritage', date: '2024-01-12', amount: 52999, status: 'completed' },
    { id: '5', customer: 'David Brown', tour: 'Andaman Islands', date: '2024-01-11', amount: 62999, status: 'confirmed' },
  ],
};

const statCards = [
  {
    title: 'Total Tours',
    icon: Map,
    getValue: (tours: number) => tours.toString(),
    change: '+3 this month',
    trend: 'up' as const,
  },
  {
    title: 'Total Bookings',
    icon: Calendar,
    getValue: () => mockStats.totalBookings.toString(),
    change: '+18 this week',
    trend: 'up' as const,
  },
  {
    title: 'Revenue',
    icon: DollarSign,
    getValue: () => `₹${(mockStats.totalRevenue / 1000).toFixed(0)}K`,
    change: `+${mockStats.monthlyGrowth}%`,
    trend: 'up' as const,
  },
  {
    title: 'Pending Bookings',
    icon: Users,
    getValue: () => mockStats.pendingBookings.toString(),
    change: '-5 from yesterday',
    trend: 'down' as const,
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: 'bg-primary/10 text-primary',
    pending: 'bg-accent/10 text-accent-foreground',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminDashboard() {
  const { tours } = useTours();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your tours.</p>
        </div>

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
                  {stat.title === 'Total Tours' ? stat.getValue(tours.length) : stat.getValue(0)}
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
                    <th className="pb-3 font-medium">Tour</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStats.recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{booking.customer}</td>
                      <td className="py-3 text-sm text-muted-foreground">{booking.tour}</td>
                      <td className="py-3 text-sm text-muted-foreground">{booking.date}</td>
                      <td className="py-3 text-sm font-medium">₹{booking.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
