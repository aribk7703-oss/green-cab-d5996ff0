import { Link } from 'react-router-dom';
import { MapPin, Mail, Facebook, Instagram, Twitter, Car } from 'lucide-react';

const spiritualPlaces = [
  { href: '/tours/shirdi', label: 'Shirdi' },
  { href: '/tours/pandharpur', label: 'Pandharpur' },
  { href: '/tours/trimbakeshwar', label: 'Trimbakeshwar' },
  { href: '/tours/bhimashankar', label: 'Bhimashankar' },
  { href: '/tours/tuljapur', label: 'Tuljapur' },
];

const heritageHistorical = [
  { href: '/tours/ajanta', label: 'Ajanta Caves' },
  { href: '/tours/ellora', label: 'Ellora Caves' },
  { href: '/tours/daulatabad-fort', label: 'Daulatabad Fort' },
  { href: '/tours/raigad-fort', label: 'Raigad Fort' },
  { href: '/tours/sindhudurg-fort', label: 'Sindhudurg Fort' },
];

const natureHillStations = [
  { href: '/tours/mahabaleshwar', label: 'Mahabaleshwar' },
  { href: '/tours/lonavala', label: 'Lonavala' },
  { href: '/tours/matheran', label: 'Matheran' },
  { href: '/tours/bhandardara', label: 'Bhandardara' },
  { href: '/tours/chikhaldara', label: 'Chikhaldara' },
];

const coastalBeach = [
  { href: '/tours/alibaug', label: 'Alibaug' },
  { href: '/tours/tarkarli', label: 'Tarkarli' },
  { href: '/tours/ganpatipule', label: 'Ganpatipule' },
  { href: '/tours/murud-janjira', label: 'Murud Janjira' },
  { href: '/tours/ratnagiri', label: 'Ratnagiri' },
];

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
    <footer className="bg-card text-foreground">
      {/* Top Tourist Places Section */}
      <div className="border-b border-border">
        <div className="container py-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-10 flex items-center justify-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="text-primary">Top Tourist Places in Maharashtra</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Spiritual Places */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🙏</span> Spiritual Places
              </h4>
              <ul className="space-y-2">
                {spiritualPlaces.map((place) => (
                  <li key={place.href}>
                    <Link 
                      to={place.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Heritage & Historical */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🏰</span> Heritage & Historical
              </h4>
              <ul className="space-y-2">
                {heritageHistorical.map((place) => (
                  <li key={place.href}>
                    <Link 
                      to={place.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nature & Hill Stations */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🏕️</span> Nature & Hill Stations
              </h4>
              <ul className="space-y-2">
                {natureHillStations.map((place) => (
                  <li key={place.href}>
                    <Link 
                      to={place.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coastal & Beach */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🏖️</span> Coastal & Beach
              </h4>
              <ul className="space-y-2">
                {coastalBeach.map((place) => (
                  <li key={place.href}>
                    <Link 
                      to={place.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company info */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl text-primary">GreenCab</span>
              </Link>
              <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                Safe, reliable and eco-friendly cab services in Aurangabad with professional drivers.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Green Cab Service ${social.label}`}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 relative">
                Quick Links
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-1"></span>
              </h4>
              <ul className="space-y-2 mt-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 relative">
                Services
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-1"></span>
              </h4>
              <ul className="space-y-2 mt-4">
                {servicesLinks.map((service) => (
                  <li key={service.href}>
                    <Link 
                      to={service.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 relative">
                Contact
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-1"></span>
              </h4>
              <ul className="space-y-3 mt-4">
                <li>
                  <p className="text-muted-foreground text-sm">24/7 Helpline</p>
                  <a 
                    href="tel:+919970178500" 
                    className="text-lg font-bold text-primary hover:opacity-80 transition-opacity"
                  >
                    +91 99701 78500
                  </a>
                </li>
                <li className="text-muted-foreground text-sm">
                  Aurangabad, India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Green Cab Service. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
