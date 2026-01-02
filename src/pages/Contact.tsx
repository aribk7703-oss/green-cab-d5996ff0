import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Travel Hub, Station Road, Aurangabad, Maharashtra 431001',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@greencab.com',
    link: 'mailto:info@greencab.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Sat: 9:00 AM - 7:00 PM',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Have questions about our tours or need help planning your trip? 
            We're here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp button */}
              <a
                href="https://wa.me/919876543210?text=Hi! I'm interested in booking a tour."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mt-8 p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-foreground group-hover:text-[#25D366] transition-colors">
                    Chat on WhatsApp
                  </span>
                  <p className="text-sm text-muted-foreground">Quick responses within minutes</p>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden h-64 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120585.30653612892!2d75.23790854472657!3d19.876152099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc63%3A0x712d538b29a2a73e!2sAurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your name"
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
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Tour Booking Inquiry</option>
                        <option value="custom">Custom Tour Request</option>
                        <option value="support">Support / Help</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us about your travel plans or questions..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="accent" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-6">
            Find quick answers to common questions about our tours and services.
          </p>
          <Button variant="outline" asChild>
            <a href="/faq">View FAQs</a>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
