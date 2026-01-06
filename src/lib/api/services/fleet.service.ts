import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Vehicle, VehicleFormData } from '../types';

export const fleetService = {
  getAll: async (): Promise<Vehicle[]> => {
    return apiClient.get<Vehicle[]>(API_ENDPOINTS.FLEET);
  },

  getById: async (id: string): Promise<Vehicle> => {
    return apiClient.get<Vehicle>(API_ENDPOINTS.VEHICLE(id));
  },

  create: async (data: VehicleFormData): Promise<Vehicle> => {
    return apiClient.post<Vehicle>(API_ENDPOINTS.FLEET, data);
  },

  update: async (id: string, data: Partial<VehicleFormData>): Promise<Vehicle> => {
    return apiClient.put<Vehicle>(API_ENDPOINTS.VEHICLE(id), data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(API_ENDPOINTS.VEHICLE(id));
  },

  toggleAvailability: async (id: string, isAvailable: boolean): Promise<Vehicle> => {
    return apiClient.patch<Vehicle>(API_ENDPOINTS.VEHICLE(id), { isAvailable });
  },
};
