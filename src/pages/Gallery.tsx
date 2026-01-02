import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', title: 'Ajanta Caves', category: 'Heritage' },
  { id: 2, src: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', title: 'Kashmir Valley', category: 'Nature' },
  { id: 3, src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', title: 'Hawa Mahal', category: 'Heritage' },
  { id: 4, src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', title: 'Kerala Backwaters', category: 'Nature' },
  { id: 5, src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', title: 'Ladakh Mountains', category: 'Adventure' },
  { id: 6, src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', title: 'Goa Beach', category: 'Beach' },
  { id: 7, src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', title: 'Taj Mahal', category: 'Heritage' },
  { id: 8, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Himalayan Sunrise', category: 'Nature' },
  { id: 9, src: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800', title: 'Dal Lake', category: 'Nature' },
  { id: 10, src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', title: 'Jaipur Palace', category: 'Heritage' },
  { id: 11, src: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800', title: 'Pangong Lake', category: 'Adventure' },
  { id: 12, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', title: 'Beach Sunset', category: 'Beach' },
];

const categories = ['All', 'Heritage', 'Nature', 'Adventure', 'Beach'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Photo Gallery
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Glimpses of incredible India through the lens of our travelers. 
            Get inspired for your next adventure.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "relative group cursor-pointer overflow-hidden rounded-xl",
                  index % 5 === 0 && "sm:col-span-2 sm:row-span-2"
                )}
                onClick={() => setLightboxImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className={cn(
                    "w-full object-cover transition-transform duration-500 group-hover:scale-110",
                    index % 5 === 0 ? "h-[400px] sm:h-full" : "h-64"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs text-primary-foreground/80 font-medium">{image.category}</span>
                  <h3 className="text-lg font-semibold text-primary-foreground">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-primary-foreground" />
          </button>
          <img
            src={lightboxImage.src.replace('w=800', 'w=1600')}
            alt={lightboxImage.title}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm text-primary-foreground/60">{lightboxImage.category}</span>
            <h3 className="text-xl font-semibold text-primary-foreground">{lightboxImage.title}</h3>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Gallery;
