export interface TourDeparture {
  date: string; // ISO date string (YYYY-MM-DD)
  spotsAvailable: number;
  price?: number; // Optional price override for this departure
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  shortDescription: string;
  duration: string;
  durationDays: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string; activities?: string[] }[];
  category: string;
  featured: boolean;
  popular: boolean;
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  departures?: TourDeparture[];
}

export const tours: Tour[] = [
  {
    id: '1',
    slug: 'ajanta-ellora-caves-expedition',
    title: 'Ajanta & Ellora Caves Expedition',
    location: 'Aurangabad, Maharashtra',
    description: 'Discover the magnificent UNESCO World Heritage Sites of Ajanta and Ellora Caves. Marvel at ancient Buddhist, Hindu, and Jain rock-cut temples dating back to the 2nd century BCE. This immersive journey takes you through centuries of artistic excellence and spiritual devotion.',
    shortDescription: 'Explore UNESCO World Heritage rock-cut caves with ancient Buddhist and Hindu art.',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    price: 12999,
    originalPrice: 15999,
    rating: 4.9,
    reviewCount: 324,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    ],
    highlights: [
      'Visit 30 rock-cut Buddhist caves at Ajanta',
      'Explore 34 caves at Ellora including the Kailasa Temple',
      'Expert-guided tours with historical insights',
      'Comfortable AC transport throughout',
    ],
    inclusions: [
      'Accommodation in 4-star hotel',
      'Daily breakfast and dinner',
      'All entrance fees',
      'Professional English-speaking guide',
      'AC vehicle for sightseeing',
      'Airport/railway station transfers',
    ],
    exclusions: [
      'Airfare or train tickets',
      'Personal expenses',
      'Travel insurance',
      'Lunch meals',
      'Camera fees at monuments',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Bibi Ka Maqbara', description: 'Arrive at Aurangabad, check into hotel. Evening visit to Bibi Ka Maqbara, known as the "Taj of the Deccan". Welcome dinner at hotel.' },
      { day: 2, title: 'Ajanta Caves Exploration', description: 'Full day excursion to Ajanta Caves (100 km). Explore ancient Buddhist paintings and sculptures. Return to hotel for dinner.' },
      { day: 3, title: 'Ellora Caves & Departure', description: 'Morning visit to Ellora Caves. Marvel at the magnificent Kailasa Temple. Afternoon departure with cherished memories.' },
    ],
    category: 'Heritage',
    featured: true,
    popular: true,
    maxGroupSize: 15,
    difficulty: 'Easy',
    departures: [
      { date: '2026-03-15', spotsAvailable: 8 },
      { date: '2026-03-22', spotsAvailable: 12 },
      { date: '2026-04-05', spotsAvailable: 15 },
      { date: '2026-04-19', spotsAvailable: 6 },
      { date: '2026-05-03', spotsAvailable: 10 },
      { date: '2026-05-17', spotsAvailable: 14 },
    ],
  },
  {
    id: '2',
    slug: 'kashmir-paradise-tour',
    title: 'Kashmir Paradise Tour',
    location: 'Srinagar, Kashmir',
    description: 'Experience the breathtaking beauty of Kashmir, often called "Paradise on Earth". Cruise on Dal Lake in traditional shikaras, explore Mughal gardens, and witness snow-capped Himalayan peaks. This tour captures the essence of Kashmir\'s natural splendor and rich culture.',
    shortDescription: 'Experience the paradise on Earth with houseboats, gardens, and Himalayan views.',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    price: 34999,
    originalPrice: 42999,
    rating: 4.8,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
    images: [
      'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200',
      'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=1200',
    ],
    highlights: [
      'Stay in luxury houseboat on Dal Lake',
      'Shikara ride at sunset',
      'Visit famous Mughal Gardens',
      'Gondola ride at Gulmarg',
      'Pahalgam valley excursion',
    ],
    inclusions: [
      'Deluxe houseboat stay (2 nights)',
      'Hotel accommodation (3 nights)',
      'All meals included',
      'Airport transfers',
      'Sightseeing as per itinerary',
      'Shikara rides',
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Pony rides',
      'Adventure activities',
      'Travel insurance',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Srinagar', description: 'Arrive at Srinagar airport. Transfer to deluxe houseboat on Dal Lake. Evening shikara ride. Overnight on houseboat.' },
      { day: 2, title: 'Mughal Gardens Tour', description: 'Visit Nishat Bagh, Shalimar Bagh, and Chashme Shahi gardens. Explore local handicraft markets. Return to houseboat.' },
      { day: 3, title: 'Gulmarg Excursion', description: 'Day trip to Gulmarg. Gondola ride to Apharwat Peak (subject to weather). Enjoy snow activities. Return to Srinagar hotel.' },
      { day: 4, title: 'Pahalgam Adventure', description: 'Drive to Pahalgam through saffron fields. Visit Betaab Valley and Aru Valley. Overnight at Pahalgam.' },
      { day: 5, title: 'Return to Srinagar', description: 'Morning at leisure in Pahalgam. Return to Srinagar. Shopping at local markets. Farewell dinner.' },
      { day: 6, title: 'Departure', description: 'Transfer to airport for onward journey. Tour ends with beautiful memories.' },
    ],
    category: 'Nature',
    featured: true,
    popular: true,
    maxGroupSize: 12,
    difficulty: 'Moderate',
    departures: [
      { date: '2026-04-01', spotsAvailable: 4 },
      { date: '2026-04-15', spotsAvailable: 10 },
      { date: '2026-05-01', spotsAvailable: 12 },
      { date: '2026-05-15', spotsAvailable: 8 },
      { date: '2026-06-01', spotsAvailable: 11 },
      { date: '2026-09-15', spotsAvailable: 12 },
      { date: '2026-10-01', spotsAvailable: 7 },
    ],
  },
  {
    id: '3',
    slug: 'rajasthan-royal-heritage',
    title: 'Rajasthan Royal Heritage',
    location: 'Jaipur - Jodhpur - Udaipur',
    description: 'Journey through the royal state of Rajasthan, exploring magnificent palaces, formidable forts, and vibrant bazaars. From the Pink City of Jaipur to the Blue City of Jodhpur and the romantic lakes of Udaipur, experience the grandeur of Rajput heritage.',
    shortDescription: 'Discover royal palaces, majestic forts, and vibrant culture of Rajasthan.',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    price: 45999,
    originalPrice: 54999,
    rating: 4.9,
    reviewCount: 678,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200',
    ],
    highlights: [
      'Amber Fort elephant ride',
      'City Palace of Jaipur',
      'Mehrangarh Fort in Jodhpur',
      'Lake Pichola boat cruise',
      'Traditional Rajasthani dinner',
      'Desert safari experience',
    ],
    inclusions: [
      'Heritage hotel accommodations',
      'Daily breakfast and dinner',
      'All monument entrance fees',
      'Private AC vehicle',
      'Professional guide',
      'Inter-city transfers',
    ],
    exclusions: [
      'Flights',
      'Lunch',
      'Personal shopping',
      'Tips and gratuities',
      'Camera fees',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Arrive in the Pink City. Check into heritage hotel. Evening visit to Birla Temple. Welcome dinner.' },
      { day: 2, title: 'Jaipur Exploration', description: 'Visit Amber Fort, City Palace, Jantar Mantar, and Hawa Mahal. Evening at Johari Bazaar.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive to Jodhpur (340 km). En route visit Ajmer and Pushkar. Check into hotel. Evening at leisure.' },
      { day: 4, title: 'Blue City Discovery', description: 'Explore Mehrangarh Fort, Jaswant Thada, and old city. Evening at Clock Tower market.' },
      { day: 5, title: 'Jodhpur to Udaipur', description: 'Scenic drive to Udaipur (250 km). Visit Ranakpur Jain Temple en route. Evening at Lake Pichola.' },
      { day: 6, title: 'Udaipur Romance', description: 'Visit City Palace, Saheliyon Ki Bari, and Jagdish Temple. Sunset boat cruise. Farewell dinner.' },
      { day: 7, title: 'Departure', description: 'Morning at leisure. Transfer to airport for departure.' },
    ],
    category: 'Heritage',
    featured: true,
    popular: true,
    maxGroupSize: 16,
    difficulty: 'Easy',
    departures: [
      { date: '2026-02-15', spotsAvailable: 3 },
      { date: '2026-03-01', spotsAvailable: 10 },
      { date: '2026-03-15', spotsAvailable: 14 },
      { date: '2026-04-01', spotsAvailable: 16 },
      { date: '2026-10-15', spotsAvailable: 12 },
      { date: '2026-11-01', spotsAvailable: 8 },
      { date: '2026-11-15', spotsAvailable: 16 },
      { date: '2026-12-20', spotsAvailable: 5 },
    ],
  },
  {
    id: '4',
    slug: 'kerala-backwaters-bliss',
    title: 'Kerala Backwaters Bliss',
    location: 'Kochi - Alleppey - Munnar',
    description: 'Immerse yourself in the serene backwaters of Kerala aboard a traditional houseboat. From the spice plantations of Munnar to the tranquil waters of Alleppey, experience God\'s Own Country in its purest form.',
    shortDescription: 'Cruise through serene backwaters and explore lush tea plantations.',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 28999,
    originalPrice: 35999,
    rating: 4.7,
    reviewCount: 445,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200',
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1200',
      'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200',
    ],
    highlights: [
      'Overnight houseboat cruise',
      'Munnar tea plantations',
      'Kathakali dance performance',
      'Spice garden visit',
      'Ayurvedic massage experience',
    ],
    inclusions: [
      'Resort accommodations',
      'Houseboat stay with all meals',
      'Airport transfers',
      'Sightseeing tours',
      'Kathakali show tickets',
    ],
    exclusions: [
      'Flights',
      'Personal expenses',
      'Optional activities',
      'Travel insurance',
    ],
    itinerary: [
      { day: 1, title: 'Kochi Arrival', description: 'Arrive in Kochi. Visit Fort Kochi, Chinese Fishing Nets, and St. Francis Church. Evening Kathakali show.' },
      { day: 2, title: 'Journey to Munnar', description: 'Scenic drive to Munnar (130 km). Visit spice plantations en route. Check into resort. Evening at leisure.' },
      { day: 3, title: 'Munnar Exploration', description: 'Visit tea estates, Mattupetty Dam, and Echo Point. Tea factory tour and tasting.' },
      { day: 4, title: 'Alleppey Backwaters', description: 'Drive to Alleppey. Board traditional houseboat. Cruise through backwaters. Overnight on houseboat.' },
      { day: 5, title: 'Departure', description: 'Morning cruise. Disembark and transfer to Kochi airport. Tour ends.' },
    ],
    category: 'Nature',
    featured: false,
    popular: true,
    maxGroupSize: 10,
    difficulty: 'Easy',
    departures: [
      { date: '2026-03-10', spotsAvailable: 6 },
      { date: '2026-03-24', spotsAvailable: 10 },
      { date: '2026-04-07', spotsAvailable: 8 },
      { date: '2026-08-15', spotsAvailable: 10 },
      { date: '2026-09-01', spotsAvailable: 7 },
      { date: '2026-12-15', spotsAvailable: 4 },
    ],
  },
  {
    id: '5',
    slug: 'ladakh-adventure-expedition',
    title: 'Ladakh Adventure Expedition',
    location: 'Leh - Nubra - Pangong',
    description: 'Embark on an exhilarating journey to the roof of the world. Experience the raw beauty of Ladakh with its high-altitude passes, ancient monasteries, and stunning landscapes that will leave you breathless.',
    shortDescription: 'Conquer high-altitude passes and pristine mountain landscapes.',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    price: 52999,
    originalPrice: 62999,
    rating: 4.8,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200',
      'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1200',
    ],
    highlights: [
      'Khardung La - World\'s highest motorable pass',
      'Pangong Lake sunrise',
      'Ancient Hemis Monastery',
      'Nubra Valley camel safari',
      'Magnetic Hill experience',
    ],
    inclusions: [
      'Hotel/camp accommodations',
      'All meals',
      'Oxygen cylinders',
      'Inner line permits',
      '4x4 vehicle',
      'Experienced driver-guide',
    ],
    exclusions: [
      'Flights to Leh',
      'Personal gear',
      'Travel insurance (mandatory)',
      'Medical expenses',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Leh', description: 'Arrive at Leh airport. Rest and acclimatize. Light walk around Leh market.' },
      { day: 2, title: 'Leh Local Sightseeing', description: 'Visit Shanti Stupa, Leh Palace, and Magnetic Hill. Continue acclimatization.' },
      { day: 3, title: 'Monasteries Tour', description: 'Visit Hemis, Thiksey, and Shey monasteries. Experience Buddhist culture.' },
      { day: 4, title: 'Leh to Nubra Valley', description: 'Drive over Khardung La pass (18,380 ft). Reach Nubra Valley. Camel safari at Hunder.' },
      { day: 5, title: 'Nubra to Pangong', description: 'Scenic drive to Pangong Lake via Shyok route. Overnight camping by the lake.' },
      { day: 6, title: 'Pangong Sunrise', description: 'Witness magical sunrise at Pangong. Return to Leh via Chang La pass.' },
      { day: 7, title: 'Leisure Day', description: 'Free day for shopping and relaxation. Visit local cafes and markets.' },
      { day: 8, title: 'Departure', description: 'Transfer to airport. Tour ends with unforgettable memories.' },
    ],
    category: 'Adventure',
    featured: true,
    popular: false,
    maxGroupSize: 8,
    difficulty: 'Challenging',
    departures: [
      { date: '2026-05-15', spotsAvailable: 4 },
      { date: '2026-06-01', spotsAvailable: 8 },
      { date: '2026-06-15', spotsAvailable: 6 },
      { date: '2026-07-01', spotsAvailable: 8 },
      { date: '2026-08-01', spotsAvailable: 5 },
      { date: '2026-09-01', spotsAvailable: 7 },
    ],
  },
  {
    id: '6',
    slug: 'goa-beach-retreat',
    title: 'Goa Beach Retreat',
    location: 'North & South Goa',
    description: 'Unwind on the golden beaches of Goa with a perfect blend of relaxation and exploration. From Portuguese heritage sites to vibrant nightlife, experience the best of India\'s sunshine state.',
    shortDescription: 'Sun, sand, and Portuguese heritage on India\'s favorite beach destination.',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    price: 18999,
    originalPrice: 23999,
    rating: 4.6,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200',
    ],
    highlights: [
      'Beach hopping - Calangute, Baga, Anjuna',
      'Old Goa churches tour',
      'Dudhsagar Falls excursion',
      'Spice plantation visit',
      'Sunset cruise on Mandovi River',
    ],
    inclusions: [
      'Beach resort accommodation',
      'Daily breakfast',
      'Airport transfers',
      'North Goa sightseeing',
      'South Goa sightseeing',
    ],
    exclusions: [
      'Flights',
      'Water sports',
      'Nightlife expenses',
      'Personal shopping',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Goa', description: 'Arrive at Goa airport. Transfer to beach resort. Relax and enjoy the beach. Evening at leisure.' },
      { day: 2, title: 'North Goa Exploration', description: 'Visit Fort Aguada, Calangute, and Baga beaches. Evening at Tito\'s Lane nightlife district.' },
      { day: 3, title: 'South Goa & Heritage', description: 'Visit Old Goa churches, Mangueshi Temple, and Colva Beach. Sunset Mandovi cruise.' },
      { day: 4, title: 'Departure', description: 'Morning at leisure. Transfer to airport. Tour ends.' },
    ],
    category: 'Beach',
    featured: false,
    popular: true,
    maxGroupSize: 20,
    difficulty: 'Easy',
    departures: [
      { date: '2026-02-14', spotsAvailable: 12 },
      { date: '2026-02-28', spotsAvailable: 18 },
      { date: '2026-03-14', spotsAvailable: 15 },
      { date: '2026-11-01', spotsAvailable: 20 },
      { date: '2026-12-01', spotsAvailable: 10 },
      { date: '2026-12-24', spotsAvailable: 6 },
      { date: '2026-12-31', spotsAvailable: 4 },
    ],
  },
];

export const categories = [
  { name: 'All', count: tours.length },
  { name: 'Heritage', count: tours.filter(t => t.category === 'Heritage').length },
  { name: 'Nature', count: tours.filter(t => t.category === 'Nature').length },
  { name: 'Adventure', count: tours.filter(t => t.category === 'Adventure').length },
  { name: 'Beach', count: tours.filter(t => t.category === 'Beach').length },
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getFeaturedTours = (): Tour[] => {
  return tours.filter(tour => tour.featured);
};

export const getPopularTours = (): Tour[] => {
  return tours.filter(tour => tour.popular);
};
