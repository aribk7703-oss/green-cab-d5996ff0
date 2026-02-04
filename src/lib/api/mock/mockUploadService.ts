import type { UploadResponse } from '../types';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock uploaded images storage (simulates file storage)
const uploadedImages: { id: string; url: string; filename: string }[] = [];

export const mockUploadService = {
  uploadImage: async (file: File): Promise<UploadResponse> => {
    await delay(800);
    
    // Create a local URL for the file (in real app this would be a server URL)
    const url = URL.createObjectURL(file);
    const id = 'img-' + Math.random().toString(36).substr(2, 9);
    
    uploadedImages.push({
      id,
      url,
      filename: file.name,
    });
    
    return {
      url,
      filename: file.name,
      size: file.size,
      mimetype: file.type,
    };
  },
  
  uploadMultiple: async (files: File[]): Promise<UploadResponse[]> => {
    const uploads = files.map(file => mockUploadService.uploadImage(file));
    return Promise.all(uploads);
  },
};
