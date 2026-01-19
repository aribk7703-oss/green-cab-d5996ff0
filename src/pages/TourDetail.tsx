import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  MapPin, Clock, Star, Users, Calendar, Check, X, 
  ChevronRight, Share2, Heart, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock/mockApiService';
import { toursService } from '@/lib/api/services/tours.service';
import type { Tour } from '@/lib/api/types';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [tour, setTour] = useState<Tour | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const api = USE_MOCK_API ? mockApiService.tours : toursService;
        const allTours = await api.getAll();
        
        // Find the tour by slug
        const foundTour = allTours.find(t => t.slug === slug && t.isActive);
        setTour(foundTour || null);
        
        // Get related tours (same category, different tour)
        if (foundTour) {
          const related = allTours
            .filter(t => t.isActive && t.slug !== slug)
            .slice(0, 3);
          setRelatedTours(related);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

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

  if (!tour) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
          <Button asChild>
            <Link to="/tours">Back to Tours</Link>
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
            <Link to="/tours" className="text-muted-foreground hover:text-primary">Tours</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate max-w-xs">{tour.title}</span>
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
                src={tour.images?.[selectedImage] || '/placeholder.svg'}
                alt={tour.title}
                className="w-full h-[300px] lg:h-[500px] object-cover"
              />
              
              {/* Image navigation */}
              {tour.images && tour.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {tour.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
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

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-destructive text-destructive")} />
                </button>
                <button className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {tour.category}
                </span>
                {tour.isFeatured && (
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {tour.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  {tour.rating} ({tour.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Overview</h2>
              <div 
                className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: tour.description }}
              />
            </section>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <div 
                      key={day.day} 
                      className="p-6 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{day.title}</h3>
                          <p className="text-muted-foreground">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="mt-3 space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Check className="w-4 h-4 text-primary" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
              <section className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tour.inclusions && tour.inclusions.length > 0 && (
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Inclusions</h2>
                      <ul className="space-y-3">
                        {tour.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions && tour.exclusions.length > 0 && (
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Exclusions</h2>
                      <ul className="space-y-3">
                        {tour.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Booking card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-primary">
                      ₹{(tour.discountPrice || tour.price).toLocaleString()}
                    </span>
                    {tour.discountPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{tour.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{tour.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      {tour.rating}
                    </span>
                  </div>
                </div>

                <Button variant="accent" size="lg" className="w-full mb-3" asChild>
                  <Link to={`/booking/${tour.slug}`}>
                    Book This Tour
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Free cancellation up to 7 days before
                </p>
              </div>

              {/* Contact card */}
              <div className="mt-6 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our travel experts are here to assist you.
                </p>
                <a 
                  href="tel:+919970178500" 
                  className="text-primary font-semibold hover:underline"
                >
                  +91 99701 78500
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related tours */}
        {relatedTours.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => (
                <Link
                  key={relatedTour._id}
                  to={`/tours/${relatedTour.slug}`}
                  className="group"
                >
                  <article className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedTour.images?.[0] || '/placeholder.svg'}
                        alt={relatedTour.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {relatedTour.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-primary font-bold">
                          ₹{(relatedTour.discountPrice || relatedTour.price).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          {relatedTour.rating}
                        </span>
                      </div>
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

export default TourDetail;
