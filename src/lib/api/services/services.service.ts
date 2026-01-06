import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Service, ServiceFormData } from '../types';

export const servicesService = {
  getAll: async (): Promise<Service[]> => {
    return apiClient.get<Service[]>(API_ENDPOINTS.SERVICES);
  },

  getById: async (id: string): Promise<Service> => {
    return apiClient.get<Service>(API_ENDPOINTS.SERVICE(id));
  },

  create: async (data: ServiceFormData): Promise<Service> => {
    return apiClient.post<Service>(API_ENDPOINTS.SERVICES, data);
  },

  update: async (id: string, data: Partial<ServiceFormData>): Promise<Service> => {
    return apiClient.put<Service>(API_ENDPOINTS.SERVICE(id), data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(API_ENDPOINTS.SERVICE(id));
  },

  toggleActive: async (id: string, isActive: boolean): Promise<Service> => {
    return apiClient.patch<Service>(API_ENDPOINTS.SERVICE(id), { isActive });
  },
};
