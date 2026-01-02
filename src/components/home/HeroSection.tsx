import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    travelers: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/tours');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          alt="Beautiful mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Trusted by 50,000+ travelers
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Discover India's <br />
            <span className="text-primary">Hidden Treasures</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Curated travel experiences to India's most breathtaking destinations. 
            From ancient caves to pristine beaches, we make your journey unforgettable.
          </p>

          {/* Search form */}
          <form 
            onSubmit={handleSearch}
            className="bg-card rounded-2xl p-3 shadow-2xl animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Destination */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border-0 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="When?"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border-0 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Travelers */}
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={searchData.travelers}
                  onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border-0 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Travelers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">3-5 People</option>
                  <option value="6+">6+ People</option>
                </select>
              </div>

              {/* Search button */}
              <Button type="submit" variant="accent" className="w-full py-4 h-auto text-base">
                <Search className="w-5 h-5 mr-2" />
                Search Tours
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '500+', label: 'Tours Completed' },
              { value: '50K+', label: 'Happy Travelers' },
              { value: '15+', label: 'Years Experience' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60" />
        </div>
      </div>
    </section>
  );
}
