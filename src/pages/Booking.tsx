import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { getTourBySlug } from '@/data/tours';
import { Button } from '@/components/ui/button';
import { ChevronRight, Calendar, Users, CreditCard, Check, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Booking = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tour = getTourBySlug(slug || '');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    travelers: 1,
    date: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    couponCode: '',
  });

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

  const totalPrice = tour.price * formData.travelers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate booking confirmation
      toast.success('Booking request submitted! We will contact you shortly.');
      navigate('/');
    }
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <Link to={`/tours/${tour.slug}`} className="text-muted-foreground hover:text-primary truncate max-w-xs">
              {tour.title}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Booking</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress steps */}
          <div className="flex items-center justify-center mb-12">
            {[
              { num: 1, label: 'Details', icon: Calendar },
              { num: 2, label: 'Contact', icon: Users },
              { num: 3, label: 'Payment', icon: CreditCard },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                    step >= s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "text-sm mt-2 font-medium",
                    step >= s.num ? "text-primary" : "text-muted-foreground"
                  )}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={cn(
                    "w-20 lg:w-32 h-1 mx-4 rounded-full transition-all",
                    step > s.num ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Trip details */}
                {step === 1 && (
                  <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Trip Details
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Travel Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => updateFormData('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Number of Travelers *
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => updateFormData('travelers', Math.max(1, formData.travelers - 1))}
                            className="w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center text-xl font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="text-2xl font-bold w-12 text-center">{formData.travelers}</span>
                          <button
                            type="button"
                            onClick={() => updateFormData('travelers', Math.min(tour.maxGroupSize, formData.travelers + 1))}
                            className="w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center text-xl font-bold transition-colors"
                          >
                            +
                          </button>
                          <span className="text-muted-foreground text-sm">
                            (Max {tour.maxGroupSize})
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Special Requests
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => updateFormData('specialRequests', e.target.value)}
                          placeholder="Any dietary requirements, accessibility needs, or special requests..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none resize-none"
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="accent" size="lg" className="w-full mt-8">
                      Continue to Contact Details
                    </Button>
                  </div>
                )}

                {/* Step 2: Contact info */}
                {step === 2 && (
                  <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button type="submit" variant="accent" size="lg" className="flex-1">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Payment
                    </h2>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Have a coupon?</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.couponCode}
                          onChange={(e) => updateFormData('couponCode', e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-2 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary outline-none text-sm"
                        />
                        <Button type="button" variant="outline" size="sm">Apply</Button>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-muted/50 mb-6">
                      <h3 className="font-semibold text-foreground mb-4">Payment Methods</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Secure payment gateway coming soon. For now, our team will contact you 
                        to arrange payment after you submit this booking request.
                      </p>
                      <div className="flex gap-4 opacity-50">
                        <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">Credit Card</div>
                        <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">UPI</div>
                        <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">Net Banking</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        className="flex-1"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      <Button type="submit" variant="accent" size="lg" className="flex-1">
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Booking Summary
                </h3>

                <div className="flex gap-4 pb-4 border-b border-border">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground line-clamp-2">{tour.title}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {tour.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.duration}</span>
                  </div>
                  {formData.date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(formData.date).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.travelers} traveler(s)</span>
                  </div>
                </div>

                <div className="space-y-2 py-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹{tour.price.toLocaleString()} × {formData.travelers}</span>
                    <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span className="text-foreground">Included</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Booking;
