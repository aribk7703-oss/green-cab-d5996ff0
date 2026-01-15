import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { bookingsService } from '@/lib/api';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';
import type { Booking, BookingStatus, BookingFilters } from '@/lib/api';
import { 
  Search, 
  Filter, 
  Eye, 
  RefreshCw, 
  Loader2, 
  Calendar,
  Phone,
  MapPin,
  Users,
  Car,
  MessageSquare,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demo when backend is not connected
const mockBookings: Booking[] = [
  { 
    _id: '1', 
    customerName: 'John Doe', 
    phone: '+91 9876543210',
    email: 'john@example.com',
    serviceType: 'tour',
    serviceName: 'Kashmir Valley Explorer', 
    pickupLocation: 'Aurangabad Airport',
    dropLocation: 'Srinagar',
    date: '2024-01-15', 
    vehicleType: 'SUV',
    passengers: 4,
    status: 'CONFIRMED',
    source: 'WEBSITE',
    notes: 'Customer requested early morning pickup',
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  },
  { 
    _id: '2', 
    customerName: 'Jane Smith', 
    phone: '+91 9876543211',
    email: 'jane@example.com',
    serviceType: 'taxi',
    serviceName: 'Airport Transfer', 
    pickupLocation: 'Aurangabad Railway Station',
    dropLocation: 'Aurangabad Airport',
    date: '2024-01-14', 
    vehicleType: 'Sedan',
    passengers: 2,
    status: 'NEW',
    source: 'WHATSAPP',
    createdAt: '2024-01-09T08:15:00Z',
    updatedAt: '2024-01-09T08:15:00Z'
  },
  { 
    _id: '3', 
    customerName: 'Mike Johnson', 
    phone: '+91 9876543212',
    serviceType: 'tour',
    serviceName: 'Ajanta Ellora Day Trip', 
    pickupLocation: 'Hotel Taj, Aurangabad',
    date: '2024-01-13', 
    vehicleType: 'Tempo Traveller',
    passengers: 12,
    status: 'CONTACTED',
    source: 'FORM',
    notes: 'Group booking - corporate team',
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-09T09:00:00Z'
  },
  { 
    _id: '4', 
    customerName: 'Sarah Williams', 
    phone: '+91 9876543213',
    email: 'sarah@example.com',
    serviceType: 'rental',
    serviceName: 'Self Drive - Innova', 
    pickupLocation: 'Green Cab Office',
    date: '2024-01-12', 
    vehicleType: 'Innova Crysta',
    passengers: 1,
    status: 'COMPLETED',
    source: 'PHONE',
    createdAt: '2024-01-06T11:00:00Z',
    updatedAt: '2024-01-12T18:00:00Z'
  },
  { 
    _id: '5', 
    customerName: 'Raj Patel', 
    phone: '+91 9876543214',
    serviceType: 'tour',
    serviceName: 'Shirdi Darshan Package', 
    pickupLocation: 'Aurangabad Bus Stand',
    date: '2024-01-16', 
    vehicleType: 'Sedan',
    passengers: 3,
    status: 'NEW',
    source: 'WEBSITE',
    createdAt: '2024-01-10T20:30:00Z',
    updatedAt: '2024-01-10T20:30:00Z'
  },
];

const statusOptions: BookingStatus[] = ['NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    NEW: 'bg-accent/20 text-accent-foreground border border-accent/30',
    CONTACTED: 'bg-blue-500/10 text-blue-600 border border-blue-500/30',
    CONFIRMED: 'bg-primary/10 text-primary border border-primary/30',
    COMPLETED: 'bg-muted text-muted-foreground border border-border',
    CANCELLED: 'bg-destructive/10 text-destructive border border-destructive/30',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const styles: Record<string, string> = {
    WEBSITE: 'bg-primary/10 text-primary',
    WHATSAPP: 'bg-green-500/10 text-green-600',
    FORM: 'bg-blue-500/10 text-blue-600',
    PHONE: 'bg-accent/10 text-accent-foreground',
  };

  return (
    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${styles[source] || 'bg-muted text-muted-foreground'}`}>
      {source}
    </span>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<BookingFilters>({
    status: undefined,
    search: '',
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_API) {
        const response = await mockApiService.bookings.getAll(filters);
        setBookings(response.data);
      } else {
        const response = await bookingsService.getAll(filters);
        setBookings(response.data);
      }
    } catch {
      try {
        const response = await mockApiService.bookings.getAll(filters);
        setBookings(response.data);
      } catch {
        // Filter mock data based on filters
        let filtered = [...mockBookings];
        if (filters.status) {
          filtered = filtered.filter(b => b.status === filters.status);
        }
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(b => 
            b.customerName.toLowerCase().includes(search) ||
            b.phone.includes(search) ||
            b.serviceName.toLowerCase().includes(search)
          );
        }
        setBookings(filtered);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
    setIsUpdating(true);
    try {
      const api = USE_MOCK_API ? mockApiService.bookings : bookingsService;
      await api.updateStatus(bookingId, newStatus);
      setBookings(prev => 
        prev.map(b => b._id === bookingId ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b)
      );
      if (selectedBooking?._id === bookingId) {
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
      }
      toast.success(`Booking status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update booking status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Bookings</h1>
            <p className="text-muted-foreground">Manage all customer inquiries and bookings</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchBookings} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or service..."
                  className="pl-9"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  status: value === 'all' ? undefined : value as BookingStatus 
                }))}
              >
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              All Bookings ({bookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Pickup</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Pax</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        {Array.from({ length: 8 }).map((_, j) => (
                          <td key={j} className="py-3">
                            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3">
                          <div className="text-sm font-medium">{booking.customerName}</div>
                          <div className="text-xs text-muted-foreground">{booking.phone}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm">{booking.serviceName}</div>
                          <div className="text-xs text-muted-foreground capitalize">{booking.serviceType}</div>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground max-w-[150px] truncate">
                          {booking.pickupLocation}
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {formatDate(booking.date)}
                        </td>
                        <td className="py-3 text-sm">{booking.passengers}</td>
                        <td className="py-3">
                          <SourceBadge source={booking.source} />
                        </td>
                        <td className="py-3">
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleStatusUpdate(booking._id, value as BookingStatus)}
                            disabled={isUpdating}
                          >
                            <SelectTrigger className="h-7 w-[120px] text-xs">
                              <StatusBadge status={booking.status} />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(booking)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display">Booking Details</DialogTitle>
              <DialogDescription>View and manage booking information</DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <StatusBadge status={selectedBooking.status} />
                  <SourceBadge source={selectedBooking.source} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedBooking.customerName}</p>
                        <p className="text-xs text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedBooking.phone}</p>
                        {selectedBooking.email && <p className="text-xs text-muted-foreground">{selectedBooking.email}</p>}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedBooking.pickupLocation}</p>
                        {selectedBooking.dropLocation && <p className="text-xs text-muted-foreground">→ {selectedBooking.dropLocation}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Car className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedBooking.serviceName}</p>
                        <p className="text-xs text-muted-foreground">{selectedBooking.vehicleType} • {selectedBooking.passengers} pax</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{formatDate(selectedBooking.date)}</p>
                        <p className="text-xs text-muted-foreground">Booking Date</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{formatDateTime(selectedBooking.createdAt)}</p>
                        <p className="text-xs text-muted-foreground">Created</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="flex items-start gap-3 rounded-lg bg-muted p-3">
                    <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Notes</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) => handleStatusUpdate(selectedBooking._id, value as BookingStatus)}
                    disabled={isUpdating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
