import type { Location, LocationFormData } from '../types/location';
import { locations, resetLocations as resetLocationsData } from './mockLocations';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const mockLocationsService = {
  getAll: async (): Promise<Location[]> => {
    await delay(300);
    return [...locations].sort((a, b) => a.order - b.order);
  },

  getById: async (id: string): Promise<Location> => {
    await delay(200);
    const location = locations.find(l => l._id === id);
    if (!location) throw new Error('Location not found');
    return location;
  },

  getBySlug: async (slug: string): Promise<Location> => {
    await delay(200);
    const location = locations.find(l => l.slug === slug);
    if (!location) throw new Error('Location not found');
    return location;
  },

  create: async (data: LocationFormData): Promise<Location> => {
    await delay(400);
    const newLocation: Location = {
      _id: Date.now().toString(),
      slug: generateSlug(data.name),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    locations.push(newLocation);
    return newLocation;
  },

  update: async (id: string, data: Partial<LocationFormData>): Promise<Location> => {
    await delay(400);
    const index = locations.findIndex(l => l._id === id);
    if (index === -1) throw new Error('Location not found');
    
    const updated: Location = {
      ...locations[index],
      ...data,
      slug: data.name ? generateSlug(data.name) : locations[index].slug,
      updatedAt: new Date().toISOString(),
    };
    locations[index] = updated;
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = locations.findIndex(l => l._id === id);
    if (index === -1) throw new Error('Location not found');
    locations.splice(index, 1);
  },

  toggleActive: async (id: string, isActive: boolean): Promise<Location> => {
    await delay(200);
    const index = locations.findIndex(l => l._id === id);
    if (index === -1) throw new Error('Location not found');
    locations[index] = { ...locations[index], isActive, updatedAt: new Date().toISOString() };
    return locations[index];
  },

  toggleFeatured: async (id: string, isFeatured: boolean): Promise<Location> => {
    await delay(200);
    const index = locations.findIndex(l => l._id === id);
    if (index === -1) throw new Error('Location not found');
    locations[index] = { ...locations[index], isFeatured, updatedAt: new Date().toISOString() };
    return locations[index];
  },

  getByCategory: async (category: string): Promise<Location[]> => {
    await delay(300);
    return locations.filter(l => l.category === category && l.isActive);
  },

  getFeatured: async (): Promise<Location[]> => {
    await delay(300);
    return locations.filter(l => l.isFeatured && l.isActive);
  },

  reset: (): void => {
    resetLocationsData();
  },
};
