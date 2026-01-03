import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminSidebar } from './AdminSidebar';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="pl-64 transition-all duration-300">
        <div className="min-h-screen p-6">{children}</div>
      </main>
    </div>
  );
}
