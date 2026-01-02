import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedTours } from '@/data/tours';

export function FeaturedTours() {
  const tours = getFeaturedTours();

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

        {/* Tours grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <Link
              key={tour.id}
              to={`/tours/${tour.slug}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  
                  {/* Badge */}
                  {tour.originalPrice && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                      {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
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
                        <span className="text-xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
                        {tour.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{tour.originalPrice.toLocaleString()}
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
      </div>
    </section>
  );
}
