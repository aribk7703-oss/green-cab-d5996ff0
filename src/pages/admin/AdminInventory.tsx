import { useMemo } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useTours } from '@/contexts/ToursContext';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  MapPin,
  Package,
  TrendingUp,
  Users,
  Edit2,
} from 'lucide-react';

interface DepartureWithTour {
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  date: string;
  spotsAvailable: number;
  totalSpots: number;
  price: number;
  location: string;
}

export default function AdminInventory() {
  const { tours } = useTours();

  const allDepartures = useMemo(() => {
    const now = new Date();
    const departures: DepartureWithTour[] = [];

    tours.forEach((tour) => {
      if (!tour.departures) return;

      const maxSpots = tour.maxGroupSize || 15;
      const defaultPrice = tour.originalPrice || tour.price;

      tour.departures.forEach((dep) => {
        const depDate = parseISO(dep.date);
        if (isAfter(depDate, now)) {
          departures.push({
            tourId: tour.id,
            tourTitle: tour.title,
            tourSlug: tour.slug,
            date: dep.date,
            spotsAvailable: dep.spotsAvailable,
            totalSpots: maxSpots,
            price: dep.price || defaultPrice,
            location: tour.location,
          });
        }
      });
    });

    return departures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [tours]);

  const stats = useMemo(() => {
    const lowStock = allDepartures.filter((d) => d.spotsAvailable <= 3 && d.spotsAvailable > 0);
    const soldOut = allDepartures.filter((d) => d.spotsAvailable === 0);
    const available = allDepartures.filter((d) => d.spotsAvailable > 3);
    const totalSpots = allDepartures.reduce((sum, d) => sum + d.spotsAvailable, 0);

    return {
      total: allDepartures.length,
      lowStock: lowStock.length,
      soldOut: soldOut.length,
      available: available.length,
      totalSpots,
    };
  }, [allDepartures]);

  const getStatusColor = (spots: number) => {
    if (spots === 0) return 'destructive';
    if (spots <= 3) return 'secondary';
    return 'default';
  };

  const getProgressColor = (spots: number, total: number) => {
    const percent = (spots / total) * 100;
    if (percent === 0) return 'bg-destructive';
    if (percent <= 20) return 'bg-amber-500';
    return 'bg-primary';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track available spots across all departure dates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Departures</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="rounded-full p-2 bg-muted">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Spots</p>
                  <p className="text-2xl font-bold">{stats.totalSpots}</p>
                </div>
                <div className="rounded-full p-2 bg-muted">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={stats.lowStock > 0 ? 'border-amber-500/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">{stats.lowStock}</p>
                  {stats.lowStock > 0 && (
                    <p className="text-xs text-amber-600 mt-1">Needs attention</p>
                  )}
                </div>
                <div className="rounded-full p-2 bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={stats.soldOut > 0 ? 'border-destructive/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sold Out</p>
                  <p className="text-2xl font-bold">{stats.soldOut}</p>
                </div>
                <div className="rounded-full p-2 bg-destructive/10">
                  <CheckCircle className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {(stats.lowStock > 0 || stats.soldOut > 0) && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-amber-700 text-base">
                <AlertTriangle className="h-5 w-5" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {allDepartures
                  .filter((d) => d.spotsAvailable <= 3)
                  .slice(0, 5)
                  .map((dep) => (
                    <div
                      key={`${dep.tourId}-${dep.date}`}
                      className="flex items-center justify-between rounded-lg border bg-background p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            dep.spotsAvailable === 0 ? 'bg-destructive' : 'bg-amber-500'
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{dep.tourTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(dep.date), 'EEE, MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={dep.spotsAvailable === 0 ? 'destructive' : 'secondary'}>
                          {dep.spotsAvailable === 0
                            ? 'Sold Out'
                            : `${dep.spotsAvailable} spots left`}
                        </Badge>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/tours/${dep.tourId}/edit`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Departures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              All Upcoming Departures
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allDepartures.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming departures scheduled</p>
                <p className="text-sm mt-1">Add departure dates to your tours to track inventory</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allDepartures.map((dep) => (
                  <div
                    key={`${dep.tourId}-${dep.date}`}
                    className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/admin/tours/${dep.tourId}/edit`}
                            className="font-medium text-sm hover:underline"
                          >
                            {dep.tourTitle}
                          </Link>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(parseISO(dep.date), 'EEE, MMM d, yyyy')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {dep.location}
                            </span>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(dep.spotsAvailable)}>
                          {dep.spotsAvailable === 0
                            ? 'Sold Out'
                            : `${dep.spotsAvailable}/${dep.totalSpots} spots`}
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1">
                          <Progress
                            value={(dep.spotsAvailable / dep.totalSpots) * 100}
                            className={`h-2 ${getProgressColor(dep.spotsAvailable, dep.totalSpots)}`}
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground w-20 text-right">
                          ₹{dep.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
