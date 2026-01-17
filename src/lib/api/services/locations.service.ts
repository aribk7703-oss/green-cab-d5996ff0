import { apiClient } from '../client';
import type { Location, LocationFormData } from '../types/location';

export const locationsService = {
  getAll: async (): Promise<Location[]> => {
    return apiClient.get<Location[]>('/locations');
  },

  getById: async (id: string): Promise<Location> => {
    return apiClient.get<Location>(`/locations/${id}`);
  },

  getBySlug: async (slug: string): Promise<Location> => {
    return apiClient.get<Location>(`/locations/slug/${slug}`);
  },

  create: async (data: LocationFormData): Promise<Location> => {
    return apiClient.post<Location>('/locations', data);
  },

  update: async (id: string, data: Partial<LocationFormData>): Promise<Location> => {
    return apiClient.put<Location>(`/locations/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`/locations/${id}`);
  },

  toggleActive: async (id: string, isActive: boolean): Promise<Location> => {
    return apiClient.patch<Location>(`/locations/${id}/toggle-active`, { isActive });
  },

  toggleFeatured: async (id: string, isFeatured: boolean): Promise<Location> => {
    return apiClient.patch<Location>(`/locations/${id}/toggle-featured`, { isFeatured });
  },

  getByCategory: async (category: string): Promise<Location[]> => {
    return apiClient.get<Location[]>(`/locations/category/${category}`);
  },

  getFeatured: async (): Promise<Location[]> => {
    return apiClient.get<Location[]>('/locations/featured');
  },
};
