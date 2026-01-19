import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock/mockApiService';
import { toursService } from '@/lib/api/services/tours.service';
import type { Tour } from '@/lib/api/types';

export function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const api = USE_MOCK_API ? mockApiService.tours : toursService;
        const data = await api.getAll();
        // Filter to featured and active tours only
        const featured = data
          .filter(t => t.isActive && t.isFeatured)
          .slice(0, 6);
        setTours(featured);
      } catch (error) {
        console.error('Error fetching featured tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Popular Destinations
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
              Featured Tours
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Handpicked experiences that showcase the best of India's diverse landscapes, 
              rich heritage, and vibrant culture.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tours" className="gap-2">
              View All Tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-elegant">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured tours available at the moment.</p>
          </div>
        ) : (
          /* Tours grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <Link
                key={tour._id}
                to={`/tours/${tour.slug}`}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <article className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.images?.[0] || '/placeholder.svg'}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    
                    {/* Badge */}
                    {tour.discountPrice && (
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                        {Math.round((1 - tour.discountPrice / tour.price) * 100)}% OFF
                      </div>
                    )}
                    
                    {/* Category */}
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {tour.category}
                    </div>

                    {/* Location overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-primary-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium truncate">{tour.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {tour.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {tour.shortDescription}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        {tour.rating} ({tour.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div>
                        <span className="text-xs text-muted-foreground">Starting from</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-primary">
                            ₹{(tour.discountPrice || tour.price).toLocaleString()}
                          </span>
                          {tour.discountPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{tour.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
