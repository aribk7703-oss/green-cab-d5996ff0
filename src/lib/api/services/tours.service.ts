import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Tour, TourFormData } from '../types';

export const toursService = {
  getAll: async (): Promise<Tour[]> => {
    return apiClient.get<Tour[]>(API_ENDPOINTS.TOURS);
  },

  getById: async (id: string): Promise<Tour> => {
    return apiClient.get<Tour>(API_ENDPOINTS.TOUR(id));
  },

  create: async (data: TourFormData): Promise<Tour> => {
    return apiClient.post<Tour>(API_ENDPOINTS.TOURS, data);
  },

  update: async (id: string, data: Partial<TourFormData>): Promise<Tour> => {
    return apiClient.put<Tour>(API_ENDPOINTS.TOUR(id), data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(API_ENDPOINTS.TOUR(id));
  },

  toggleActive: async (id: string, isActive: boolean): Promise<Tour> => {
    return apiClient.patch<Tour>(API_ENDPOINTS.TOUR(id), { isActive });
  },

  toggleFeatured: async (id: string, isFeatured: boolean): Promise<Tour> => {
    return apiClient.patch<Tour>(API_ENDPOINTS.TOUR(id), { isFeatured });
  },
};
