import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight">Green Cab</span>
                <span className="text-xs text-primary-foreground/60 -mt-0.5">Tours & Travels</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Your trusted travel partner for exploring India's most beautiful destinations. 
              Creating unforgettable memories since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Tours', 'Packages', 'Gallery', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular tours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Popular Tours</h4>
            <ul className="space-y-3">
              {['Ajanta Ellora', 'Kashmir Valley', 'Rajasthan Heritage', 'Kerala Backwaters', 'Ladakh Adventure', 'Goa Beaches'].map((tour) => (
                <li key={tour}>
                  <Link 
                    to="/tours" 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {tour}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  123 Travel Hub, Station Road,<br />
                  Aurangabad, Maharashtra 431001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@greencab.com" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  info@greencab.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Green Cab Tours & Travels. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/terms" className="text-primary-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
