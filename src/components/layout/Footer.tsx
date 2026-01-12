import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Car } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Our Fleet' },
  { href: '/blog', label: 'Blog' },
];

const servicesLinks = [
  { href: '/services/city-taxi', label: 'City Taxi' },
  { href: '/services/airport-pickup', label: 'Airport Pickup' },
  { href: '/services/heritage-tours', label: 'Heritage Tours' },
  { href: '/services/outstation-cab', label: 'Outstation Cab' },
  { href: '/services/corporate-events', label: 'Corporate Events' },
  { href: '/services/one-way-cab', label: 'One Way Cab' },
];

const socialLinks = [
  { 
    href: 'https://www.facebook.com/greencabservice', 
    icon: Facebook, 
    label: 'Facebook' 
  },
  { 
    href: 'https://www.instagram.com/green_cab_service', 
    icon: Instagram, 
    label: 'Instagram' 
  },
  { 
    href: 'https://twitter.com/greencabservice', 
    icon: Twitter, 
    label: 'Twitter' 
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight">GreenCab</span>
                <span className="text-xs text-primary-foreground/60 -mt-0.5">Tours & Travels</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Safe, reliable and eco-friendly cab services in Aurangabad with professional drivers.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Green Cab Service ${social.label}`}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((service) => (
                <li key={service.href}>
                  <Link 
                    to={service.href} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-primary-foreground/70 text-sm">24/7 Helpline</p>
                <a 
                  href="tel:+919970178500" 
                  className="text-lg font-bold text-primary hover:opacity-80 transition-opacity"
                >
                  +91 99701 78500
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  Aurangabad, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@greencab.com" 
                  className="text-primary-foreground/70 hover:text-primary transition-colors"
                >
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
            © {new Date().getFullYear()} Green Cab Service. All Rights Reserved.
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
