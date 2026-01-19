import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Briefcase, 
  Phone, 
  Car, 
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock/mockApiService';
import { fleetService } from '@/lib/api/services/fleet.service';
import type { Vehicle } from '@/lib/api/types';

const vehicleTypes = [
  { value: 'all', label: 'All Vehicles' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'tempo', label: 'Tempo Traveller' },
  { value: 'bus', label: 'Bus' },
];

const Fleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const api = USE_MOCK_API ? mockApiService.fleet : fleetService;
        const data = await api.getAll();
        // Only show active vehicles on public site
        setVehicles(data.filter(v => v.isActive));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (selectedType !== 'all') {
      result = result.filter(v => v.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(query) ||
        v.type.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => a.order - b.order);
  }, [vehicles, selectedType, searchQuery]);

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      sedan: 'Sedan',
      suv: 'SUV',
      luxury: 'Luxury',
      tempo: 'Tempo Traveller',
      bus: 'Bus',
    };
    return typeMap[type] || type;
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Our Fleet
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Choose from our wide range of well-maintained vehicles for a comfortable and safe journey.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          {loading ? (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                {/* Vehicle Type Filters */}
                <div className="flex flex-wrap gap-2">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedType === type.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none w-full lg:w-64"
                  />
                </div>
              </div>

              {/* Results count */}
              <p className="text-muted-foreground mb-6">
                Showing {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}
              </p>

              {/* Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <article 
                    key={vehicle._id}
                    className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={vehicle.image || '/placeholder.svg'}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      
                      {/* Availability Badge */}
                      <Badge 
                        variant={vehicle.isAvailable ? "default" : "secondary"}
                        className={cn(
                          "absolute top-4 left-4",
                          vehicle.isAvailable 
                            ? "bg-green-500 hover:bg-green-500" 
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {vehicle.isAvailable ? 'Available' : 'Not Available'}
                      </Badge>

                      {/* Type Badge */}
                      <Badge variant="outline" className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
                        {getTypeLabel(vehicle.type)}
                      </Badge>

                      {/* Quick Stats */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
                        <span className="flex items-center gap-1 text-sm">
                          <Users className="w-4 h-4" />
                          {vehicle.seatingCapacity} Seats
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <Briefcase className="w-4 h-4" />
                          {vehicle.luggageCapacity}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {vehicle.name}
                      </h3>

                      {/* Features */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {vehicle.features.slice(0, 4).map((feature, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 4 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{vehicle.features.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xs text-muted-foreground">Starting from</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-primary">₹{vehicle.basePrice.toLocaleString()}</span>
                              <span className="text-sm text-muted-foreground">/day</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">Per km</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-semibold text-foreground">₹{vehicle.pricePerKm}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button 
                            asChild
                            className="flex-1 gap-2"
                            disabled={!vehicle.isAvailable}
                          >
                            <Link to={`/booking/fleet?vehicle=${vehicle.slug}`}>
                              Book Now
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            asChild
                          >
                            <a href="tel:+919970178500" aria-label="Call to inquire">
                              <Phone className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Empty State */}
              {filteredVehicles.length === 0 && (
                <div className="text-center py-16">
                  <Car className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-lg">No vehicles found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedType('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Looking for a specific vehicle or have special requirements? Our team is here to help you find the perfect solution for your travel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+919970178500" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call: +91 99701 78500
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Fleet;
