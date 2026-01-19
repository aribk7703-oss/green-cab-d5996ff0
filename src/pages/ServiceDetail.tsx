import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';
import { servicesService } from '@/lib/api';
import type { Service } from '@/lib/api';
import { 
  Plane, 
  Car, 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle
} from 'lucide-react';

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  plane: Plane,
  car: Car,
  briefcase: Briefcase,
  map: MapPin,
  clock: Clock,
  users: Users,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const api = USE_MOCK_API ? mockApiService.services : servicesService;
        const allServices = await api.getAll();
        const foundService = allServices.find(s => s.slug === slug && s.isActive);
        
        if (foundService) {
          setService(foundService);
          // Update page title
          document.title = `${foundService.seo?.title || foundService.name} | GreenCab`;
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setError('Failed to load service');
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return Car;
    return iconMap[iconName.toLowerCase()] || Car;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !service) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <Car className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The service you're looking for doesn't exist or is no longer available.
          </p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const Icon = getIcon(service.icon);

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {service.name}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                {service.shortDescription}
              </p>
            </div>

            {/* Image */}
            {service.image && service.image !== '/placeholder.svg' && (
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">About This Service</h2>
                <div 
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Professional Drivers',
                    'Clean & Sanitized Vehicles',
                    '24/7 Customer Support',
                    'Real-time Tracking',
                    'Flexible Scheduling',
                    'Competitive Pricing',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    Book This Service
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ready to experience our {service.name.toLowerCase()}? Get in touch with us today.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link to={`/booking/${service.slug}`}>
                      Book Now
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="tel:+919970178500">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full" size="lg" asChild>
                    <a 
                      href={`https://wa.me/919970178500?text=Hi, I'm interested in ${service.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Available 24/7 for your convenience
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is here to answer any questions you may have about our services.
                </p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to="/contact">Contact Support →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
