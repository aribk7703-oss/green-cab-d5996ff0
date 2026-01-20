import type { BlogPost, BlogFormData } from '../types';
import { mockBlogPosts } from './mockBlog';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state
let blogPosts = [...mockBlogPosts];

// Generate unique IDs
const generateId = () => 'blog-' + Math.random().toString(36).substr(2, 9);

export const mockBlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    await delay(500);
    return blogPosts;
  },
  
  getPublished: async (): Promise<BlogPost[]> => {
    await delay(500);
    return blogPosts.filter(p => p.isPublished);
  },
  
  getBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    await delay(300);
    return blogPosts.find(p => p.slug === slug && p.isPublished);
  },
  
  getById: async (id: string): Promise<BlogPost> => {
    await delay(300);
    const post = blogPosts.find(p => p._id === id);
    if (!post) throw new Error('Blog post not found');
    return post;
  },
  
  getRelated: async (currentSlug: string, limit: number = 3): Promise<BlogPost[]> => {
    await delay(300);
    const currentPost = blogPosts.find(p => p.slug === currentSlug);
    if (!currentPost) return blogPosts.filter(p => p.isPublished).slice(0, limit);
    
    return blogPosts
      .filter(p => p.slug !== currentSlug && p.isPublished)
      .filter(p => 
        p.category === currentPost.category ||
        p.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit);
  },
  
  getByCategory: async (category: string): Promise<BlogPost[]> => {
    await delay(400);
    return blogPosts.filter(p => p.category === category && p.isPublished);
  },
  
  create: async (data: BlogFormData): Promise<BlogPost> => {
    await delay(600);
    const newPost: BlogPost = {
      ...data,
      _id: generateId(),
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      author: { name: 'Admin', avatar: undefined },
      publishedAt: data.isPublished ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    blogPosts.unshift(newPost);
    return newPost;
  },
  
  update: async (id: string, data: Partial<BlogFormData>): Promise<BlogPost> => {
    await delay(500);
    const index = blogPosts.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Blog post not found');
    
    const updatedSlug = data.title 
      ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : blogPosts[index].slug;
    
    blogPosts[index] = { 
      ...blogPosts[index], 
      ...data,
      slug: updatedSlug,
      publishedAt: data.isPublished && !blogPosts[index].publishedAt 
        ? new Date().toISOString() 
        : blogPosts[index].publishedAt,
      updatedAt: new Date().toISOString() 
    };
    return blogPosts[index];
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(400);
    const index = blogPosts.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Blog post not found');
    blogPosts.splice(index, 1);
  },
  
  togglePublish: async (id: string, isPublished: boolean): Promise<BlogPost> => {
    await delay(300);
    const index = blogPosts.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Blog post not found');
    blogPosts[index] = { 
      ...blogPosts[index], 
      isPublished,
      publishedAt: isPublished ? new Date().toISOString() : blogPosts[index].publishedAt 
    };
    return blogPosts[index];
  },
};
