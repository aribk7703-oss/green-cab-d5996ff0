// API Configuration
// Update this URL to point to your Node.js + Express backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_ME: '/auth/me',
  
  // Dashboard
  DASHBOARD: '/admin/dashboard',
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_STATUS: (id: string) => `/bookings/${id}/status`,
  
  // Services
  SERVICES: '/services',
  SERVICE: (id: string) => `/services/${id}`,
  
  // Tours
  TOURS: '/tours',
  TOUR: (id: string) => `/tours/${id}`,
  
  // Fleet
  FLEET: '/fleet',
  VEHICLE: (id: string) => `/fleet/${id}`,
  
  // Blog
  BLOG: '/blog',
  BLOG_POST: (id: string) => `/blog/${id}`,
  
  // Upload
  UPLOAD: '/upload',
} as const;
