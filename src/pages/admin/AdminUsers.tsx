import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage admin and staff users</p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              All Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">User management will be available when backend is connected.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
