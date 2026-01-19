import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  MapPin, Clock, ChevronRight, ArrowRight, 
  Calendar, IndianRupee, Check, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { mockLocationsService } from '@/lib/api/mock/mockLocationsService';
import { locationsService } from '@/lib/api/services/locations.service';
import { USE_MOCK_API } from '@/lib/api/mock/mockApiService';
import type { Location, LocationCategory } from '@/lib/api/types/location';

const categoryIcons: Record<LocationCategory, string> = {
  'Spiritual': '🕉️',
  'Heritage': '🏛️',
  'Nature': '🌿',
  'Coastal': '🏖️',
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [location, setLocation] = useState<Location | null>(null);
  const [relatedLocations, setRelatedLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const api = USE_MOCK_API ? mockLocationsService : locationsService;
        
        // Try to get by slug first
        let foundLocation: Location | null = null;
        try {
          foundLocation = await api.getBySlug(slug);
        } catch {
          // If getBySlug fails, try fetching all and finding
          const allLocations = await api.getAll();
          foundLocation = allLocations.find(l => l.slug === slug && l.isActive) || null;
        }
        
        setLocation(foundLocation);
        
        // Get related locations (same category, different location)
        if (foundLocation) {
          const allLocations = await api.getAll();
          const related = allLocations
            .filter(l => l.isActive && l.slug !== slug && l.category === foundLocation.category)
            .slice(0, 3);
          setRelatedLocations(related);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [slug]);

  // Combine main image with gallery
  const allImages = location ? [location.image, ...(location.gallery || [])].filter(Boolean) : [];

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-muted/50 border-b border-border">
          <div className="container py-4">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="container py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="w-full h-[500px] rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!location) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Button asChild>
            <Link to="/destinations">Back to Destinations</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/destinations" className="text-muted-foreground hover:text-primary">Destinations</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate max-w-xs">{location.name}</span>
          </nav>
        </div>
      </div>

      <article className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <img
                src={allImages[selectedImage] || '/placeholder.svg'}
                alt={location.name}
                className="w-full h-[300px] lg:h-[500px] object-cover"
              />
              
              {/* Image navigation */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                        selectedImage === index 
                          ? "border-primary-foreground scale-105" 
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary/10 text-primary border-0">
                  {categoryIcons[location.category]} {location.category}
                </Badge>
                {location.isFeatured && (
                  <Badge className="bg-accent/10 text-accent border-0">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {location.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {location.address}
                </span>
                {location.bestTimeToVisit && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Best: {location.bestTimeToVisit}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">About</h2>
              <div 
                className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: location.description }}
              />
            </section>

            {/* Highlights */}
            {location.highlights && location.highlights.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {location.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery */}
            {location.gallery && location.gallery.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {location.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index + 1)}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt={`${location.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Quick Information
                </h3>
                
                <div className="space-y-4">
                  {location.timings && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Timings</span>
                        <p className="font-medium">{location.timings}</p>
                      </div>
                    </div>
                  )}
                  
                  {location.entryFee && (
                    <div className="flex items-start gap-3">
                      <IndianRupee className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Entry Fee</span>
                        <p className="font-medium">{location.entryFee}</p>
                      </div>
                    </div>
                  )}
                  
                  {location.bestTimeToVisit && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Best Time to Visit</span>
                        <p className="font-medium">{location.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-muted-foreground">Address</span>
                      <p className="font-medium">{location.address}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" asChild>
                  <Link to="/tours">
                    Find Tours Here
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Contact card */}
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Plan Your Visit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our travel experts can help you plan the perfect trip to {location.name}.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related destinations */}
        {relatedLocations.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
              Explore Similar Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedLocations.map((related) => (
                <Link
                  key={related._id}
                  to={`/destinations/${related.slug}`}
                  className="group"
                >
                  <article className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={related.image || '/placeholder.svg'}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm">
                        {categoryIcons[related.category]} {related.category}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
};

export default DestinationDetail;
