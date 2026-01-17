import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Badge } from '@/components/ui/badge';
import { USE_MOCK_API } from '@/lib/api/mock';

// Generate breadcrumb items from current path
function getBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];
  
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Skip 'admin' as we'll show it as Dashboard
    if (path === 'admin' && index === 0) {
      breadcrumbs.push({ label: 'Dashboard', href: '/admin/dashboard' });
    } else if (path !== 'admin') {
      // Format label: capitalize and handle special cases
      let label = path.charAt(0).toUpperCase() + path.slice(1);
      
      // Handle specific paths
      if (path === 'create') label = 'Create New';
      if (path === 'edit') label = 'Edit';
      if (path === 'dashboard') return; // Skip duplicate dashboard
      
      breadcrumbs.push({ label, href: currentPath });
    }
  });
  
  return breadcrumbs;
}

export function AdminHeader() {
  const location = useLocation();
  const { user } = useAdminAuth();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header className="sticky top-0 z-30 mb-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          <div className="mx-2 h-4 w-px bg-border" />
          
          <nav className="flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link 
                    to={crumb.href} 
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {USE_MOCK_API && (
            <Badge variant="outline" className="border-amber-500 bg-amber-500/10 text-amber-600">
              Demo Mode
            </Badge>
          )}
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-64 pl-9 text-sm"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </Button>
          
          {user && (
            <div className="hidden items-center gap-3 border-l border-border pl-4 md:flex">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {user.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
