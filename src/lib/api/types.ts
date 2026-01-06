// Common types for API responses

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string>;
}

// Dashboard
export interface DashboardStats {
  totalBookings: number;
  newLeadsToday: number;
  activeServices: number;
  activeTours: number;
  recentBookings: Booking[];
}

// Booking
export type BookingStatus = 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type BookingSource = 'WHATSAPP' | 'FORM' | 'PHONE' | 'WEBSITE';

export interface Booking {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceType: 'tour' | 'taxi' | 'rental';
  serviceName: string;
  pickupLocation: string;
  dropLocation?: string;
  date: string;
  vehicleType: string;
  passengers: number;
  status: BookingStatus;
  source: BookingSource;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  source?: BookingSource;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Service
export interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  icon?: string;
  isActive: boolean;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  icon?: string;
  isActive: boolean;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Tour
export interface Tour {
  _id: string;
  title: string;
  slug: string;
  location: string;
  description: string;
  shortDescription: string;
  duration: string;
  price: number;
  discountPrice?: number;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
  category: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourFormData {
  title: string;
  location: string;
  description: string;
  shortDescription: string;
  duration: string;
  price: number;
  discountPrice?: number;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Fleet / Vehicle
export interface Vehicle {
  _id: string;
  name: string;
  slug: string;
  type: 'sedan' | 'suv' | 'tempo' | 'bus' | 'luxury';
  seatingCapacity: number;
  luggageCapacity: string;
  pricePerKm: number;
  basePrice: number;
  image: string;
  features: string[];
  isAvailable: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFormData {
  name: string;
  type: 'sedan' | 'suv' | 'tempo' | 'bus' | 'luxury';
  seatingCapacity: number;
  luggageCapacity: string;
  pricePerKm: number;
  basePrice: number;
  image: string;
  features: string[];
  isAvailable: boolean;
  isActive: boolean;
  order: number;
}

// Blog
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Upload
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}
