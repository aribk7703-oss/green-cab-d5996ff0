export type LocationCategory = 'Spiritual' | 'Heritage' | 'Nature' | 'Coastal';

export interface Location {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: LocationCategory;
  image: string;
  gallery: string[];
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  bestTimeToVisit: string;
  entryFee?: string;
  timings?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface LocationFormData {
  name: string;
  description: string;
  shortDescription: string;
  category: LocationCategory;
  image: string;
  gallery: string[];
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  bestTimeToVisit: string;
  entryFee?: string;
  timings?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const LOCATION_CATEGORIES: LocationCategory[] = ['Spiritual', 'Heritage', 'Nature', 'Coastal'];
