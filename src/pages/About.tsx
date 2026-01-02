import { MainLayout } from '@/components/layout/MainLayout';
import { Award, Users, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '15+', label: 'Years of Excellence', icon: Award },
  { value: '50K+', label: 'Happy Travelers', icon: Users },
  { value: '100+', label: 'Destinations', icon: MapPin },
  { value: '500+', label: 'Tours Completed', icon: Heart },
];

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    bio: 'With 20+ years in travel industry, Rajesh founded Green Cab with a vision to make travel accessible and memorable.',
  },
  {
    name: 'Priya Deshmukh',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    bio: 'Priya ensures every tour runs smoothly, managing logistics and partnerships across India.',
  },
  {
    name: 'Amit Sharma',
    role: 'Lead Tour Guide',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: 'A certified historian and passionate storyteller, Amit brings heritage sites to life.',
  },
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              About Green Cab Tours & Travels
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Since 2010, we've been crafting unforgettable travel experiences across India. 
              Our passion for exploration and commitment to excellence has made us one of 
              the most trusted names in Indian tourism.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 -mt-12">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-elegant text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
                From a Dream to India's Trusted Travel Partner
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Green Cab Tours & Travels was born from a simple belief: every journey should 
                  be extraordinary. What started as a small operation in Aurangabad, organizing 
                  tours to the magnificent Ajanta and Ellora caves, has grown into a comprehensive 
                  travel company serving thousands of travelers each year.
                </p>
                <p>
                  Our name "Green Cab" reflects our commitment to sustainable tourism and 
                  eco-friendly travel practices. We believe in traveling responsibly, respecting 
                  local communities, and preserving the natural and cultural heritage of the 
                  destinations we visit.
                </p>
                <p>
                  Today, we offer curated travel experiences across India—from the snow-capped 
                  peaks of Kashmir to the tropical backwaters of Kerala, from the royal palaces 
                  of Rajasthan to the pristine beaches of Goa. Each tour is designed with care, 
                  combining comfort, authenticity, and adventure.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600"
                alt="India Gate"
                className="rounded-2xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">2010</div>
                <div className="text-sm">Year Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentic Experiences',
                description: 'We go beyond tourist spots to offer genuine cultural immersion and meaningful connections with local communities.',
              },
              {
                title: 'Sustainable Travel',
                description: 'Environmental responsibility guides every decision, from eco-friendly transport to supporting local conservation efforts.',
              },
              {
                title: 'Customer First',
                description: 'Your safety, comfort, and satisfaction are our top priorities. We\'re available 24/7 to ensure a worry-free journey.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-8 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
              Meet the Experts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Explore India With Us?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let us help you create memories that last a lifetime. Browse our tours 
            or get in touch to plan your perfect trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/tours">Explore Tours</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
