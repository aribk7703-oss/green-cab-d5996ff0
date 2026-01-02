import { Shield, Clock, Users, Award, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All tours are carefully vetted with comprehensive safety measures and travel insurance options.',
  },
  {
    icon: Clock,
    title: 'Best Price Guarantee',
    description: 'Found a lower price? We\'ll match it. Our transparent pricing ensures you get the best deals.',
  },
  {
    icon: Users,
    title: 'Expert Local Guides',
    description: 'Passionate local guides who bring destinations to life with authentic stories and insider knowledge.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by travel industry leaders for exceptional service and customer satisfaction.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance before, during, and after your trip for complete peace of mind.',
  },
  {
    icon: CreditCard,
    title: 'Easy Booking',
    description: 'Simple online booking with flexible payment options and instant confirmation.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Travel With Us
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Your Journey, Our Commitment
          </h2>
          <p className="text-muted-foreground mt-4">
            We don't just plan trips—we craft experiences that become cherished memories. 
            Here's what sets us apart.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-6 transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 mt-3 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
