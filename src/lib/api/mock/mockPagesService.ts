import { Page, PageFormData } from '../types/page';
import { mockPages } from './mockPages';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let pages = [...mockPages];

export const mockPagesService = {
  async getAll(): Promise<Page[]> {
    await delay(500);
    return [...pages];
  },

  async getById(id: string): Promise<Page | null> {
    await delay(300);
    return pages.find(page => page.id === id) || null;
  },

  async getBySlug(slug: string): Promise<Page | null> {
    await delay(300);
    return pages.find(page => page.slug === slug) || null;
  },

  async create(data: PageFormData): Promise<Page> {
    await delay(500);
    const newPage: Page = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
      author: 'Admin',
    };
    pages.push(newPage);
    return newPage;
  },

  async update(id: string, data: Partial<PageFormData>): Promise<Page> {
    await delay(500);
    const index = pages.findIndex(page => page.id === id);
    if (index === -1) {
      throw new Error('Page not found');
    }
    
    const updatedPage: Page = {
      ...pages[index],
      ...data,
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === 'published' && !pages[index].publishedAt 
        ? new Date().toISOString() 
        : pages[index].publishedAt,
    };
    pages[index] = updatedPage;
    return updatedPage;
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const index = pages.findIndex(page => page.id === id);
    if (index === -1) {
      throw new Error('Page not found');
    }
    pages.splice(index, 1);
  },

  async toggleStatus(id: string): Promise<Page> {
    await delay(300);
    const index = pages.findIndex(page => page.id === id);
    if (index === -1) {
      throw new Error('Page not found');
    }
    
    const newStatus = pages[index].status === 'published' ? 'draft' : 'published';
    const updatedPage: Page = {
      ...pages[index],
      status: newStatus,
      updatedAt: new Date().toISOString(),
      publishedAt: newStatus === 'published' ? new Date().toISOString() : pages[index].publishedAt,
    };
    pages[index] = updatedPage;
    return updatedPage;
  },

  async duplicate(id: string): Promise<Page> {
    await delay(500);
    const page = pages.find(p => p.id === id);
    if (!page) {
      throw new Error('Page not found');
    }
    
    const newPage: Page = {
      ...page,
      id: String(Date.now()),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: null,
    };
    pages.push(newPage);
    return newPage;
  },
};
