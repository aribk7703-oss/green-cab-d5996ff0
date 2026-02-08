import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { MapPin, Clock, Star, ArrowRight, Grid, List, Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTours } from '@/contexts/ToursContext';
import { getNextDeparture, formatDepartureDate } from '@/lib/utils/tours';
import type { Tour } from '@/data/tours';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'duration';
const TOURS_PER_PAGE = 6;

const Tours = () => {
  const { tours: contextTours } = useTours();
  const [tours, setTours] = useState<Tour[]>(contextTours);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate loading for smoother UX
    const timer = setTimeout(() => {
      setTours(contextTours);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [contextTours]);

  // Get unique categories from tours
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(tours.map(t => t.category))];
    return cats.map(cat => ({
      name: cat,
      count: cat === 'All' ? tours.length : tours.filter(t => t.category === cat).length
    }));
  }, [tours]);

  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(tour => tour.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        tour =>
          tour.title.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => {
          const daysA = parseInt(a.duration) || 0;
          const daysB = parseInt(b.duration) || 0;
          return daysA - daysB;
        });
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [tours, selectedCategory, sortBy, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
    return filteredTours.slice(startIndex, startIndex + TOURS_PER_PAGE);
  }, [filteredTours, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Explore Our Tours
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover handcrafted travel experiences across India's most captivating destinations.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          {loading ? (
            // Loading skeleton
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
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
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Search and controls */}
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none w-48"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Duration</option>
                  </select>

                  {/* View toggle */}
                  <div className="hidden lg:flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'grid' ? "bg-card shadow-sm" : "hover:bg-card/50"
                      )}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'list' ? "bg-card shadow-sm" : "hover:bg-card/50"
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results count */}
              <p className="text-muted-foreground mb-6">
                Showing {paginatedTours.length} of {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'}
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>

              {/* Tours grid/list */}
              <div className={cn(
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              )}>
                {paginatedTours.map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/tours/${tour.slug}`}
                    className="group"
                  >
                    <article className={cn(
                      "bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                      viewMode === 'list' && "flex flex-col lg:flex-row"
                    )}>
                      {/* Image */}
                      <div className={cn(
                        "relative overflow-hidden",
                        viewMode === 'grid' ? "h-64" : "h-64 lg:h-auto lg:w-80 flex-shrink-0"
                      )}>
                        <img
                        src={tour.images[0] || tour.image || '/placeholder.svg'}
                          alt={tour.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        
                        {tour.originalPrice && (
                          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                            {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {tour.category}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-primary-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium truncate">{tour.location}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1">
                        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {tour.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {tour.shortDescription}
                        </p>

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

                        <div className="space-y-4">
                           {/* Next departure indicator */}
                           {getNextDeparture(tour) && (
                             <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
                               <Calendar className="w-3.5 h-3.5 text-accent" />
                               <span className="text-xs font-medium text-accent">
                                 Next: {formatDepartureDate(getNextDeparture(tour)!)}
                               </span>
                             </div>
                           )}

                           {/* Price section */}
                           <div className="flex items-center justify-between pt-4 border-t border-border">
                             <div>
                               <span className="text-xs text-muted-foreground">Starting from</span>
                               <div className="flex items-baseline gap-2">
                                 <span className="text-xl font-bold text-primary">
                                 ₹{tour.price.toLocaleString()}
                                 </span>
                               {tour.originalPrice && (
                                   <span className="text-sm text-muted-foreground line-through">
                                   ₹{tour.originalPrice.toLocaleString()}
                                   </span>
                                 )}
                               </div>
                             </div>
                             <Button variant="ghost" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                               View Details
                               <ArrowRight className="w-4 h-4" />
                             </Button>
                           </div>
                         </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        currentPage === page && "bg-primary text-primary-foreground"
                      )}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Empty state */}
              {filteredTours.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No tours found matching your criteria.</p>
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
    </MainLayout>
  );
};

export default Tours;
