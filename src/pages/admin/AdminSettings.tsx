import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your application</p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Settings will be available when backend is connected.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
