import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Clock, 
  Star, 
  Search,
  ArrowRight,
  Compass
} from 'lucide-react';
import { mockLocationsService } from '@/lib/api/mock/mockLocationsService';
import { locationsService } from '@/lib/api/services/locations.service';
import { USE_MOCK_API } from '@/lib/api/mock/mockApiService';
import type { Location, LocationCategory, LOCATION_CATEGORIES } from '@/lib/api/types/location';

const categoryIcons: Record<LocationCategory, string> = {
  'Spiritual': '🕉️',
  'Heritage': '🏛️',
  'Nature': '🌿',
  'Coastal': '🏖️',
};

const Destinations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const api = USE_MOCK_API ? mockLocationsService : locationsService;
        const data = await api.getAll();
        // Only show active locations on public site
        setLocations(data.filter(l => l.isActive));
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Get unique categories from locations
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(locations.map(l => l.category))];
    return cats.map(cat => ({
      name: cat,
      count: cat === 'All' ? locations.length : locations.filter(l => l.category === cat).length,
      icon: cat === 'All' ? '🌍' : categoryIcons[cat as LocationCategory] || '📍'
    }));
  }, [locations]);

  const filteredLocations = useMemo(() => {
    let result = [...locations];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(location => location.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        location =>
          location.name.toLowerCase().includes(query) ||
          location.address.toLowerCase().includes(query) ||
          location.shortDescription.toLowerCase().includes(query)
      );
    }

    // Sort by order, then featured
    return result.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.order - b.order;
    });
  }, [locations, selectedCategory, searchQuery]);

  const featuredLocations = useMemo(() => 
    locations.filter(l => l.isFeatured).slice(0, 3),
    [locations]
  );

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Explore Destinations
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover incredible places across India, from ancient temples to pristine beaches.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      {!loading && featuredLocations.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
              Featured Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredLocations.map((location) => (
                <Link
                  key={location._id}
                  to={`/destinations/${location.slug}`}
                  className="group relative rounded-2xl overflow-hidden h-80"
                >
                  <img
                    src={location.image || '/placeholder.svg'}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-2 bg-primary/90">
                      {categoryIcons[location.category]} {location.category}
                    </Badge>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                      {location.name}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm line-clamp-2">
                      {location.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 lg:py-16">
        <div className="container">
          {loading ? (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-28 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden">
                    <Skeleton className="h-56 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Filters bar */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      <span>{category.icon}</span>
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none w-full lg:w-64"
                  />
                </div>
              </div>

              {/* Results count */}
              <p className="text-muted-foreground mb-6">
                Showing {filteredLocations.length} {filteredLocations.length === 1 ? 'destination' : 'destinations'}
              </p>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map((location) => (
                  <Link
                    key={location._id}
                    to={`/destinations/${location.slug}`}
                    className="group"
                  >
                    <article className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={location.image || '/placeholder.svg'}
                          alt={location.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        
                        {location.isFeatured && (
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                        
                        <Badge variant="outline" className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
                          {categoryIcons[location.category]} {location.category}
                        </Badge>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-primary-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium truncate">{location.address}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {location.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {location.shortDescription}
                        </p>

                        {/* Highlights */}
                        {location.highlights && location.highlights.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {location.highlights.slice(0, 3).map((highlight, idx) => (
                              <span 
                                key={idx}
                                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Meta info */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {location.bestTimeToVisit && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {location.bestTimeToVisit}
                              </span>
                            )}
                          </div>
                          {location.entryFee && (
                            <span className="text-sm font-medium text-primary">
                              {location.entryFee}
                            </span>
                          )}
                        </div>

                        <Button variant="ghost" size="sm" className="w-full mt-4 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Explore More
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {filteredLocations.length === 0 && (
                <div className="text-center py-16">
                  <Compass className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-muted-foreground mb-8">
              Let our travel experts help you create an unforgettable journey to these incredible destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/tours">Browse Tours</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Destinations;
