import { apiClient, AdminUser } from '../client';

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileUpdateData {
  name: string;
  email: string;
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location?: string;
  lastActive: string;
  isCurrent: boolean;
  createdAt: string;
}

export const profileService = {
  getProfile: () => apiClient.get<AdminUser>('/admin/profile'),
  
  updateProfile: (data: ProfileUpdateData) => 
    apiClient.put<AdminUser>('/admin/profile', data),
  
  changePassword: (data: PasswordChangeData) => 
    apiClient.post<{ message: string }>('/admin/profile/change-password', data),
  
  getSessions: () => apiClient.get<Session[]>('/admin/sessions'),
  
  revokeSession: (sessionId: string) => 
    apiClient.delete<{ message: string }>(`/admin/sessions/${sessionId}`),
  
  revokeAllSessions: () => 
    apiClient.delete<{ message: string }>('/admin/sessions'),
};
