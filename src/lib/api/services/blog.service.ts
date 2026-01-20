import { apiClient } from '../client';
import type { BlogPost, BlogFormData } from '../types';

export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    return apiClient.get<BlogPost[]>('/blog');
  },
  
  getPublished: async (): Promise<BlogPost[]> => {
    return apiClient.get<BlogPost[]>('/blog?published=true');
  },
  
  getBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    try {
      return await apiClient.get<BlogPost>(`/blog/slug/${slug}`);
    } catch {
      return undefined;
    }
  },
  
  getById: async (id: string): Promise<BlogPost> => {
    return apiClient.get<BlogPost>(`/blog/${id}`);
  },
  
  getRelated: async (slug: string, limit: number = 3): Promise<BlogPost[]> => {
    return apiClient.get<BlogPost[]>(`/blog/related/${slug}?limit=${limit}`);
  },
  
  getByCategory: async (category: string): Promise<BlogPost[]> => {
    return apiClient.get<BlogPost[]>(`/blog/category/${category}`);
  },
  
  create: async (data: BlogFormData): Promise<BlogPost> => {
    return apiClient.post<BlogPost>('/blog', data);
  },
  
  update: async (id: string, data: Partial<BlogFormData>): Promise<BlogPost> => {
    return apiClient.put<BlogPost>(`/blog/${id}`, data);
  },
  
  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`/blog/${id}`);
  },
  
  togglePublish: async (id: string, isPublished: boolean): Promise<BlogPost> => {
    return apiClient.patch<BlogPost>(`/blog/${id}/publish`, { isPublished });
  },
};
