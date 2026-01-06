import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { DashboardStats } from '../types';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD);
  },
};
