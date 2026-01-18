export type PageStatus = 'published' | 'draft';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  status: PageStatus;
  template: 'default' | 'full-width' | 'sidebar';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: string;
}

export interface PageFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  status: PageStatus;
  template: 'default' | 'full-width' | 'sidebar';
}
