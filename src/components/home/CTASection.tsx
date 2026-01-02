import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
          alt="Beautiful landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Let us help you create unforgettable memories. Book your dream tour today 
            and experience India like never before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="xl" asChild>
              <Link to="/tours" className="gap-2">
                Explore Tours
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:+919876543210" className="gap-2">
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
