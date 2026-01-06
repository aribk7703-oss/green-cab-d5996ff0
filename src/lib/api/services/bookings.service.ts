import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Booking, BookingFilters, BookingStatus, PaginatedResponse } from '../types';

export const bookingsService = {
  getAll: async (filters?: BookingFilters): Promise<PaginatedResponse<Booking>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get<PaginatedResponse<Booking>>(`${API_ENDPOINTS.BOOKINGS}${query}`);
  },

  getById: async (id: string): Promise<Booking> => {
    return apiClient.get<Booking>(`${API_ENDPOINTS.BOOKINGS}/${id}`);
  },

  updateStatus: async (id: string, status: BookingStatus): Promise<Booking> => {
    return apiClient.patch<Booking>(API_ENDPOINTS.BOOKING_STATUS(id), { status });
  },

  addNote: async (id: string, note: string): Promise<Booking> => {
    return apiClient.patch<Booking>(`${API_ENDPOINTS.BOOKINGS}/${id}/notes`, { note });
  },
};
