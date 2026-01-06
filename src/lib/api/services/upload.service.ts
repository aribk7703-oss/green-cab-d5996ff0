import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { UploadResponse } from '../types';

export const uploadService = {
  uploadImage: async (file: File): Promise<UploadResponse> => {
    return apiClient.uploadFile<UploadResponse>(API_ENDPOINTS.UPLOAD, file, 'image');
  },

  uploadMultiple: async (files: File[]): Promise<UploadResponse[]> => {
    const uploads = files.map(file => uploadService.uploadImage(file));
    return Promise.all(uploads);
  },
};
