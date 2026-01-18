import { apiClient } from '../client';
import { Page, PageFormData } from '../types/page';

export const pagesService = {
  async getAll(): Promise<Page[]> {
    return apiClient.get<Page[]>('/pages');
  },

  async getById(id: string): Promise<Page | null> {
    return apiClient.get<Page>(`/pages/${id}`);
  },

  async getBySlug(slug: string): Promise<Page | null> {
    return apiClient.get<Page>(`/pages/slug/${slug}`);
  },

  async create(data: PageFormData): Promise<Page> {
    return apiClient.post<Page>('/pages', data);
  },

  async update(id: string, data: Partial<PageFormData>): Promise<Page> {
    return apiClient.put<Page>(`/pages/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/pages/${id}`);
  },

  async toggleStatus(id: string): Promise<Page> {
    return apiClient.patch<Page>(`/pages/${id}/toggle-status`);
  },

  async duplicate(id: string): Promise<Page> {
    return apiClient.post<Page>(`/pages/${id}/duplicate`);
  },
};
