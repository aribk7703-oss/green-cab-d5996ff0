import { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useTours } from '@/contexts/ToursContext';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Mail, 
  Phone,
  Download,
  Home,
  ArrowRight
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { tours } = useTours();

  // Get booking details from URL params
  const tourSlug = searchParams.get('tour');
  const bookingDate = searchParams.get('date');
  const guests = parseInt(searchParams.get('guests') || '1', 10);
  const bookingId = searchParams.get('id') || `GC${Date.now().toString().slice(-8)}`;
  const customerName = searchParams.get('name') || 'Guest';
  const customerEmail = searchParams.get('email') || '';

  const tour = tours.find(t => t.slug === tourSlug);

  useEffect(() => {
    // Redirect if missing required params
    if (!tourSlug || !bookingDate) {
      navigate('/tours');
    }
  }, [tourSlug, bookingDate, navigate]);

  if (!tour) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button asChild>
            <Link to="/tours">Browse Tours</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const totalPrice = tour.price * guests;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;
  const formattedDate = bookingDate ? format(parseISO(bookingDate), 'EEEE, MMMM d, yyyy') : '';

  return (
    <MainLayout>
      <div className="min-h-[80vh] bg-gradient-to-b from-primary/5 to-background">
        <div className="container py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg">
                Thank you, {customerName.split(' ')[0]}! Your adventure awaits.
              </p>
            </div>

            {/* Booking Reference Card */}
            <div className="bg-card rounded-2xl shadow-elegant border border-border overflow-hidden mb-8">
              {/* Header with Booking ID */}
              <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Booking Reference</p>
                  <p className="text-xl font-bold text-primary font-mono">{bookingId}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>

              {/* Tour Details */}
              <div className="p-6">
                <div className="flex gap-4 pb-6 border-b border-border">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                      {tour.title}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {tour.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-2 gap-6 py-6 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Departure Date</span>
                    </div>
                    <p className="font-medium text-foreground">{formattedDate}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Travelers</span>
                    </div>
                    <p className="font-medium text-foreground">{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-6 space-y-3">
                  <h3 className="font-semibold text-foreground mb-4">Price Breakdown</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ₹{tour.price.toLocaleString()} × {guests} {guests === 1 ? 'guest' : 'guests'}
                    </span>
                    <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="text-foreground">₹{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="text-foreground">Included</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between">
                    <span className="font-semibold text-foreground">Total Paid</span>
                    <span className="text-xl font-bold text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-card rounded-2xl shadow-elegant border border-border p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      A detailed confirmation has been sent to {customerEmail || 'your email'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pre-Trip Information</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive detailed trip information 7 days before departure
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pack and Prepare</p>
                    <p className="text-sm text-muted-foreground">
                      Check the inclusions list and prepare for your adventure!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="bg-muted/50 rounded-2xl border border-border p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">Need help?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:support@greencab.in" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@greencab.in
                </a>
                <a 
                  href="tel:+919970178500" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 99701 78500
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="flex-1 gap-2" asChild>
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="accent" size="lg" className="flex-1 gap-2" asChild>
                <Link to="/tours">
                  Explore More Tours
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingConfirmation;
