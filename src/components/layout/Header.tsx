import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronDown, ChevronRight, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const servicesDropdown = [
  { href: '/services/city-taxi', label: 'City Taxi' },
  { href: '/services/airport-pickup', label: 'Airport Pickup' },
  { href: '/services/heritage-tours', label: 'Heritage Tours' },
  { href: '/services/outstation-cab', label: 'Outstation Cab' },
  { href: '/services/corporate-events', label: 'Corporate Events' },
];

const oneWayCabRoutes = [
  { href: '/one-way/aurangabad-pune', label: 'Aurangabad → Pune' },
  { href: '/one-way/aurangabad-mumbai', label: 'Aurangabad → Mumbai' },
  { href: '/one-way/aurangabad-shirdi', label: 'Aurangabad → Shirdi' },
  { href: '/one-way/aurangabad-nashik', label: 'Aurangabad → Nashik' },
  { href: '/one-way/aurangabad-nagpur', label: 'Aurangabad → Nagpur' },
  { href: '/one-way/aurangabad-hyderabad', label: 'Aurangabad → Hyderabad' },
];

const toursDropdown = [
  { href: '/tours/ajanta', label: 'Ajanta Caves' },
  { href: '/tours/ellora', label: 'Ellora Caves' },
  { href: '/tours/grishneshwar', label: 'Grishneshwar Jyotirlinga' },
  { href: '/tours/aurangabad-caves', label: 'Aurangabad Caves' },
  { href: '/tours/bibi-ka-maqbara', label: 'Bibi Ka Maqbara' },
  { href: '/tours/panchakki', label: 'Panchakki' },
  { href: '/tours/daulatabad-fort', label: 'Daulatabad Fort' },
  { href: '/tours/khuldabad', label: 'Khuldabad' },
  { href: '/tours/shirdi', label: 'Shirdi' },
];

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
    setOpenMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (name: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+919970178500" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+91 99701 78500</span>
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Aurangabad, Maharashtra</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:opacity-80 transition-opacity">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-foreground leading-tight">GreenCab</span>
              <span className="text-xs text-muted-foreground -mt-0.5">Tours & Travels</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Home */}
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/" ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/about" ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-primary hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[280px] p-3 bg-card border border-border rounded-lg shadow-lg">
                      {servicesDropdown.map((item) => (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link
                            to={item.href}
                            className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                      {/* One Way Cab Submenu */}
                      <div className="relative group/submenu">
                        <div className="flex items-center justify-between px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors cursor-pointer">
                          <span>One Way Cab</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <div className="absolute left-full top-0 ml-1 w-[200px] p-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all">
                          {oneWayCabRoutes.map((route) => (
                            <Link
                              key={route.href}
                              to={route.href}
                              className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                            >
                              {route.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Fleet */}
                <NavigationMenuItem>
                  <Link
                    to="/fleet"
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/fleet" ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    Fleet
                  </Link>
                </NavigationMenuItem>

                {/* Tours Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-primary hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Tours
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[220px] p-3 bg-card border border-border rounded-lg shadow-lg">
                      {toursDropdown.map((item) => (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link
                            to={item.href}
                            className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                  <Link
                    to="/blog"
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/blog" ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <Link
                    to="/contact"
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/contact" ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    Contact Us
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="accent" asChild>
              <Link to="/tours">Book Ride</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === "/" ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
                )}
              >
                Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === "/about" ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
                )}
              >
                About
              </Link>

              {/* Services Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('services')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-foreground/80 hover:bg-muted transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMobileDropdown === 'services' && "rotate-180")} />
                </button>
                {openMobileDropdown === 'services' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {servicesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary rounded-lg hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {/* One Way Cab Submenu */}
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu('oneway')}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-foreground/70 hover:bg-muted rounded-lg transition-colors"
                      >
                        <span>One Way Cab</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", openMobileSubmenu === 'oneway' && "rotate-90")} />
                      </button>
                      {openMobileSubmenu === 'oneway' && (
                        <div className="ml-4 mt-1 space-y-1">
                          {oneWayCabRoutes.map((route) => (
                            <Link
                              key={route.href}
                              to={route.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-xs text-foreground/60 hover:text-primary rounded-lg hover:bg-muted transition-colors"
                            >
                              {route.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Fleet */}
              <Link
                to="/fleet"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === "/fleet" ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
                )}
              >
                Fleet
              </Link>

              {/* Tours Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('tours')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-foreground/80 hover:bg-muted transition-colors"
                >
                  <span>Tours</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMobileDropdown === 'tours' && "rotate-180")} />
                </button>
                {openMobileDropdown === 'tours' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {toursDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary rounded-lg hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === "/blog" ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
                )}
              >
                Blog
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === "/contact" ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
                )}
              >
                Contact Us
              </Link>

              {/* Book Ride Button */}
              <div className="px-4 pt-2">
                <Button variant="accent" className="w-full" asChild>
                  <Link to="/tours" onClick={() => setIsOpen(false)}>Book Ride</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
