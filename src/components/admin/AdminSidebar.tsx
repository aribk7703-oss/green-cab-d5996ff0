import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu,
  Briefcase,
  Car,
  UserCircle,
  ChevronDown,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { 
    icon: Map, 
    label: 'Tours', 
    href: '/admin/tours',
    children: [
      { label: 'All Tours', href: '/admin/tours' },
      { label: 'Add New Tour', href: '/admin/tours/create' },
    ]
  },
  { icon: MapPin, label: 'Locations', href: '/admin/locations' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: Car, label: 'Fleet', href: '/admin/fleet' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: UserCircle, label: 'Profile', href: '/admin/profile' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface NavItemWithChildrenProps {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  pathname: string;
}

function NavItemWithChildren({ item, isActive, collapsed, pathname }: NavItemWithChildrenProps) {
  const [isOpen, setIsOpen] = useState(isActive);

  if (!item.children || collapsed) {
    return (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          pathname === item.href
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {item.children.map(child => (
            <Link
              key={child.href}
              to={child.href}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm transition-colors',
                pathname === child.href
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AdminSidebar() {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <Map className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-sidebar-foreground">
                Green Cab
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(item => {
            const isActive = location.pathname === item.href || 
              (item.children?.some(child => location.pathname === child.href));
            
            return (
              <NavItemWithChildren
                key={item.href}
                item={item}
                isActive={!!isActive}
                collapsed={collapsed}
                pathname={location.pathname}
              />
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-3">
          {!collapsed && user && (
            <div className="mb-3 px-3">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              'w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
