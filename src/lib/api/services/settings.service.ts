import { apiClient } from '../client';

export interface SiteSettings {
  branding: {
    siteName: string;
    tagline: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    googleMapsUrl: string;
    businessHours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
  payment: {
    stripeEnabled: boolean;
    stripePublishableKey: string;
    stripeSecretKey: string;
    razorpayEnabled: boolean;
    razorpayKeyId: string;
    razorpayKeySecret: string;
    codEnabled: boolean;
    currency: string;
    taxPercentage: number;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
}

export const settingsService = {
  getSettings: () => apiClient.get<SiteSettings>('/admin/settings'),
  
  updateBranding: (data: SiteSettings['branding']) => 
    apiClient.put<SiteSettings>('/admin/settings/branding', data),
  
  updateContact: (data: SiteSettings['contact']) => 
    apiClient.put<SiteSettings>('/admin/settings/contact', data),
  
  updateSocial: (data: SiteSettings['social']) => 
    apiClient.put<SiteSettings>('/admin/settings/social', data),
  
  updatePayment: (data: SiteSettings['payment']) => 
    apiClient.put<SiteSettings>('/admin/settings/payment', data),
  
  updateSeo: (data: SiteSettings['seo']) => 
    apiClient.put<SiteSettings>('/admin/settings/seo', data),
};
