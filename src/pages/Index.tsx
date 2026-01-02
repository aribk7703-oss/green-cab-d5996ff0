import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
