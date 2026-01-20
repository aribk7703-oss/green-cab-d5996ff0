import type { BlogPost, BlogFormData } from '../types';

// Convert static blog data to API format
export const mockBlogPosts: BlogPost[] = [
  {
    _id: 'blog-1',
    slug: 'ajanta-caves-complete-travel-guide',
    title: 'Ajanta Caves: A Complete Travel Guide to Ancient Buddhist Art',
    excerpt: 'Discover the magnificent Ajanta Caves, a UNESCO World Heritage Site featuring stunning Buddhist rock-cut cave monuments dating back to the 2nd century BCE.',
    content: `## Introduction to Ajanta Caves

The Ajanta Caves are a group of 30 rock-cut Buddhist cave monuments located in the Aurangabad district of Maharashtra, India. Dating from the 2nd century BCE to about 480 CE, these caves are considered masterpieces of Buddhist religious art and represent the finest examples of ancient Indian art.

## History and Significance

The caves were carved in two distinct phases. The first phase began in the 2nd century BCE, and the second phase occurred in the 5th and 6th centuries CE during the Vakataka dynasty. After being abandoned around 480 CE, the caves were forgotten until a British officer, John Smith, accidentally rediscovered them in 1819 during a tiger hunt.

## What to See

### Cave 1: The Painted Cave
This cave features some of the most famous murals in Indian art history, including the celebrated Bodhisattva Padmapani painting. The intricate details and vivid colors have survived remarkably well over centuries.

### Cave 2: The Ornate Shrine
Known for its elaborate carvings and paintings depicting the birth of Buddha, this cave showcases the pinnacle of artistic achievement at Ajanta.

## Best Time to Visit

The ideal time to visit Ajanta Caves is from November to March when the weather is pleasant. Avoid the monsoon season (July-September) as the caves can become slippery and some areas may be closed.

## How to Reach

- **By Air**: The nearest airport is Aurangabad (100 km away)
- **By Train**: Jalgaon Railway Station is the nearest (59 km)
- **By Road**: Well-connected by state highways from Mumbai and Pune

## Tips for Visitors

1. Carry comfortable walking shoes
2. Photography is allowed without flash
3. Hire an official guide for detailed explanations
4. Carry water and light snacks
5. Visit early morning to avoid crowds`,
    coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Heritage',
    tags: ['Ajanta', 'UNESCO', 'Buddhist Art', 'Maharashtra', 'Heritage'],
    isPublished: true,
    publishedAt: '2024-01-15',
    seo: {
      title: 'Ajanta Caves Travel Guide - UNESCO World Heritage Site',
      description: 'Complete travel guide to Ajanta Caves featuring ancient Buddhist art, history, timings, and tips.',
      keywords: ['Ajanta Caves', 'UNESCO', 'Buddhist Art', 'Maharashtra Travel']
    },
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    _id: 'blog-2',
    slug: 'ellora-caves-architectural-marvel',
    title: 'Ellora Caves: Exploring India\'s Greatest Architectural Marvel',
    excerpt: 'Explore the Ellora Caves, a remarkable complex of Hindu, Buddhist, and Jain cave temples carved from basalt cliffs over five centuries.',
    content: `## The Wonder of Ellora

Ellora Caves, located in the Aurangabad district of Maharashtra, is one of the largest rock-cut monastery-temple cave complexes in the world. What makes Ellora unique is that it features temples and artwork from three religions – Buddhism, Hinduism, and Jainism – representing the religious harmony that prevailed in ancient India.

## History and UNESCO Recognition

Built between the 6th and 11th centuries, Ellora was designated a UNESCO World Heritage Site in 1983. The site comprises 34 caves: 17 Hindu (caves 13-29), 12 Buddhist (caves 1-12), and 5 Jain (caves 30-34).

## Must-See Caves

### Cave 16: Kailasa Temple
The crown jewel of Ellora, the Kailasa Temple is the world's largest monolithic rock excavation. Dedicated to Lord Shiva, it was carved from the top down from a single piece of basalt cliff.

### Cave 10: Vishvakarma (Carpenter's Cave)
A Buddhist chaitya (prayer hall) featuring a large Buddha statue and intricate carvings.

## Planning Your Visit

### Timings
Open: 6:00 AM to 6:00 PM (Closed on Tuesdays)

### Entry Fee
- Indian Nationals: ₹40
- Foreign Nationals: ₹600

### Best Season
October to March offers the most comfortable weather for exploration.`,
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Heritage',
    tags: ['Ellora', 'UNESCO', 'Kailasa Temple', 'Maharashtra', 'Architecture'],
    isPublished: true,
    publishedAt: '2024-01-10',
    seo: {
      title: 'Ellora Caves Guide - UNESCO World Heritage Site',
      description: 'Explore the Ellora Caves featuring Hindu, Buddhist, and Jain temples.',
      keywords: ['Ellora Caves', 'UNESCO', 'Kailasa Temple', 'Maharashtra']
    },
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z'
  },
  {
    _id: 'blog-3',
    slug: 'kashmir-paradise-on-earth-travel-guide',
    title: 'Kashmir: Your Ultimate Guide to Paradise on Earth',
    excerpt: 'Plan your dream trip to Kashmir with our comprehensive guide covering Srinagar, Gulmarg, Pahalgam, and the magical Dal Lake houseboats.',
    content: `## Welcome to Kashmir

Often called "Paradise on Earth," Kashmir is a region of breathtaking natural beauty nestled in the northern part of India. With its snow-capped mountains, pristine lakes, lush valleys, and traditional houseboats, Kashmir offers experiences that stay with you forever.

## Top Destinations

### Srinagar: The Summer Capital
- **Dal Lake**: Experience the iconic shikara rides and stay in traditional houseboats
- **Mughal Gardens**: Visit Shalimar Bagh, Nishat Bagh, and Chashme Shahi
- **Old City**: Explore ancient mosques and traditional Kashmiri architecture

### Gulmarg: The Meadow of Flowers
- World's highest operating cable car (Gulmarg Gondola)
- Skiing during winter (December to February)
- Golf course in summer
- Stunning views of Nanga Parbat

### Pahalgam: Valley of Shepherds
- Betaab Valley (named after the Bollywood movie)
- Aru Valley for nature walks
- Chandanwari for snow experiences
- Base for Amarnath Yatra pilgrimage

## Best Time to Visit

- **Spring (March-May)**: Tulip gardens, pleasant weather
- **Summer (June-August)**: Ideal for all activities
- **Autumn (Sept-Nov)**: Golden chinar trees, harvest
- **Winter (Dec-Feb)**: Snow sports, frozen lakes`,
    coverImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Destinations',
    tags: ['Kashmir', 'Srinagar', 'Gulmarg', 'Dal Lake', 'Houseboats'],
    isPublished: true,
    publishedAt: '2024-01-05',
    seo: {
      title: 'Kashmir Travel Guide - Paradise on Earth',
      description: 'Complete Kashmir travel guide covering Srinagar, Gulmarg, Pahalgam, and Dal Lake.',
      keywords: ['Kashmir', 'Srinagar', 'Dal Lake', 'Gulmarg']
    },
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z'
  },
  {
    _id: 'blog-4',
    slug: 'shirdi-spiritual-journey-guide',
    title: 'Shirdi: Complete Guide to Sai Baba Temple and Spiritual Journey',
    excerpt: 'Everything you need to know about visiting Shirdi, the holy abode of Sai Baba, including darshan timings, accommodation, and nearby attractions.',
    content: `## The Sacred Town of Shirdi

Shirdi, located in the Ahmednagar district of Maharashtra, is one of India's most visited pilgrimage destinations. It is the home of Sai Baba, a revered saint who lived here in the late 19th and early 20th centuries.

## Sai Baba Samadhi Mandir

The main temple complex houses:
- **Samadhi Mandir**: Where Sai Baba's mortal remains rest
- **Dwarkamai**: The mosque where Sai Baba lived for 60 years
- **Chavadi**: Where Sai Baba slept on alternate nights
- **Gurusthan**: The neem tree under which young Sai Baba was found

## Darshan Timings

| Session | Timing |
|---------|--------|
| Kakad Aarti | 4:15 AM |
| Morning Darshan | 5:30 AM - 12:15 PM |
| Madhyan Aarti | 12:00 PM |
| Afternoon Darshan | 12:15 PM - 9:45 PM |
| Shej Aarti | 10:30 PM |

## How to Reach

- **By Air**: Nearest airport is Shirdi Airport (14 km)
- **By Train**: Sainagar Shirdi Railway Station (5 km)
- **By Road**: Well-connected from Mumbai (296 km), Pune (185 km), Nashik (83 km)`,
    coverImage: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Pilgrimage',
    tags: ['Shirdi', 'Sai Baba', 'Pilgrimage', 'Maharashtra', 'Spiritual'],
    isPublished: true,
    publishedAt: '2024-01-01',
    seo: {
      title: 'Shirdi Travel Guide - Sai Baba Temple Darshan',
      description: 'Complete Shirdi guide with darshan timings, travel info, and nearby attractions.',
      keywords: ['Shirdi', 'Sai Baba', 'Pilgrimage', 'Maharashtra']
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: 'blog-5',
    slug: 'rajasthan-royal-heritage-tour',
    title: 'Rajasthan: A Royal Journey Through India\'s Land of Kings',
    excerpt: 'Explore the majestic forts, vibrant culture, and golden deserts of Rajasthan - India\'s most colorful state.',
    content: `## The Land of Maharajas

Rajasthan, meaning "Land of Kings," is India's largest state and home to some of the most spectacular forts, palaces, and cultural experiences in the country.

## Top Destinations

### Jaipur: The Pink City
- Amber Fort and Palace
- Hawa Mahal (Palace of Winds)
- City Palace and Jantar Mantar
- Local bazaars for textiles and jewelry

### Udaipur: The City of Lakes
- Lake Pichola boat rides
- City Palace complex
- Monsoon Palace
- Romantic sunset views

### Jodhpur: The Blue City
- Mehrangarh Fort
- Jaswant Thada
- Clock Tower Market
- Blue-painted old city

### Jaisalmer: The Golden City
- Jaisalmer Fort (living fort)
- Sam Sand Dunes safari
- Patwon Ki Haveli
- Desert camping under stars

## Best Time to Visit

October to March is ideal, with pleasant weather for sightseeing. Avoid April to June due to extreme heat.`,
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Destinations',
    tags: ['Rajasthan', 'Jaipur', 'Udaipur', 'Desert', 'Heritage'],
    isPublished: true,
    publishedAt: '2023-12-20',
    seo: {
      title: 'Rajasthan Travel Guide - Royal Heritage Tour',
      description: 'Explore Rajasthan\'s majestic forts, palaces, and desert experiences.',
      keywords: ['Rajasthan', 'Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer']
    },
    createdAt: '2023-12-20T00:00:00.000Z',
    updatedAt: '2023-12-20T00:00:00.000Z'
  },
  {
    _id: 'blog-6',
    slug: 'kerala-backwaters-complete-guide',
    title: 'Kerala Backwaters: Your Guide to God\'s Own Country',
    excerpt: 'Experience the serene backwaters of Kerala with houseboat stays, Ayurvedic retreats, and lush green landscapes.',
    content: `## Welcome to God's Own Country

Kerala, on India's southwestern coast, is known for its palm-lined beaches, backwaters, and rich cultural heritage.

## Backwater Destinations

### Alleppey (Alappuzha)
The "Venice of the East" offers:
- Houseboat cruises
- Punnamada Lake
- Annual Nehru Trophy Boat Race
- Coir industry villages

### Kumarakom
- Bird sanctuary
- Luxury resorts
- Vembanad Lake
- Traditional toddy shops

## Houseboat Experience

Traditional houseboats (Kettuvallam) offer:
- Private cabins with modern amenities
- Onboard chef preparing Kerala cuisine
- Scenic routes through villages
- Overnight stays under stars

## Other Kerala Highlights

- **Munnar**: Tea plantations and hills
- **Thekkady**: Wildlife sanctuary
- **Kovalam**: Beach paradise
- **Fort Kochi**: Colonial heritage

## Best Time to Visit

September to March offers pleasant weather. Monsoon (June-August) has its own charm but may limit activities.`,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
    author: {
      name: 'Green Cab Travel Team',
      avatar: undefined
    },
    category: 'Destinations',
    tags: ['Kerala', 'Backwaters', 'Houseboat', 'Ayurveda', 'Beach'],
    isPublished: true,
    publishedAt: '2023-12-15',
    seo: {
      title: 'Kerala Backwaters Guide - God\'s Own Country',
      description: 'Complete Kerala backwaters guide with houseboat stays and travel tips.',
      keywords: ['Kerala', 'Backwaters', 'Alleppey', 'Houseboat']
    },
    createdAt: '2023-12-15T00:00:00.000Z',
    updatedAt: '2023-12-15T00:00:00.000Z'
  }
];
