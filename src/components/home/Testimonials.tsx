import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    text: 'The Ajanta Ellora tour was absolutely magical! Our guide was incredibly knowledgeable and the arrangements were flawless. Green Cab made our family trip truly memorable.',
    tour: 'Ajanta Ellora Expedition',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    text: 'Kashmir was a dream come true! The houseboat stay was luxurious and the Gulmarg experience was breathtaking. Highly recommend their services.',
    tour: 'Kashmir Paradise Tour',
  },
  {
    id: 3,
    name: 'Ananya Patel',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    text: 'The Rajasthan tour exceeded all expectations. From the palaces to the desert safari, every moment was perfectly planned. Will definitely book again!',
    tour: 'Rajasthan Royal Heritage',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground mt-4">
            Real experiences from real travelers who explored India with us.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Tour badge */}
              <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-6">
                {testimonial.tour}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
