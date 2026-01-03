import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function AdminBookings() {
  const mockBookings = [
    { id: '1', customer: 'John Doe', email: 'john@example.com', tour: 'Kashmir Valley Explorer', date: '2024-01-15', pax: 2, amount: 91998, status: 'confirmed' },
    { id: '2', customer: 'Jane Smith', email: 'jane@example.com', tour: 'Goa Beach Paradise', date: '2024-01-14', pax: 4, amount: 115996, status: 'pending' },
    { id: '3', customer: 'Mike Johnson', email: 'mike@example.com', tour: 'Kerala Backwaters', date: '2024-01-13', pax: 2, amount: 71998, status: 'confirmed' },
    { id: '4', customer: 'Sarah Williams', email: 'sarah@example.com', tour: 'Rajasthan Heritage', date: '2024-01-12', pax: 3, amount: 158997, status: 'completed' },
    { id: '5', customer: 'David Brown', email: 'david@example.com', tour: 'Andaman Islands', date: '2024-01-11', pax: 2, amount: 125998, status: 'cancelled' },
  ];

  const statusStyles = {
    confirmed: 'bg-primary/10 text-primary',
    pending: 'bg-accent/10 text-accent-foreground',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">Manage customer bookings</p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              All Bookings
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
                    <th className="pb-3 font-medium">Pax</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-muted-foreground">{booking.email}</p>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{booking.tour}</td>
                      <td className="py-4 text-sm text-muted-foreground">{booking.date}</td>
                      <td className="py-4 text-sm">{booking.pax}</td>
                      <td className="py-4 text-sm font-medium">₹{booking.amount.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[booking.status as keyof typeof statusStyles]}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
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
