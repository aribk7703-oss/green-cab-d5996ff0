import type { 
  DashboardStats, 
  Booking, 
  BookingFilters, 
  BookingStatus,
  Tour, 
  TourFormData,
  Vehicle, 
  VehicleFormData,
  Service, 
  ServiceFormData,
  PaginatedResponse 
} from '../types';
import { 
  mockDashboardStats, 
  mockBookings, 
  mockTours, 
  mockVehicles, 
  mockServices,
  mockAdminUser 
} from './mockData';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state (persists during session)
let bookings = [...mockBookings];
let tours = [...mockTours];
let vehicles = [...mockVehicles];
let services = [...mockServices];

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockApiService = {
  // Auth
  auth: {
    login: async (email: string, password: string) => {
      await delay(800);
      if (email === 'admin@greencab.com' && password === 'admin123') {
        return {
          token: 'mock-jwt-token-' + generateId(),
          user: mockAdminUser,
        };
      }
      throw new Error('Invalid email or password');
    },
    logout: async () => {
      await delay(300);
      return { message: 'Logged out successfully' };
    },
  },

  // Dashboard
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      await delay(600);
      return {
        ...mockDashboardStats,
        newLeadsToday: bookings.filter(b => b.status === 'NEW').length,
        totalBookings: bookings.length,
        recentBookings: bookings.slice(0, 5),
      };
    },
    getRecentBookings: async (): Promise<Booking[]> => {
      await delay(400);
      return bookings.slice(0, 5);
    },
  },

  // Bookings
  bookings: {
    getAll: async (filters?: BookingFilters): Promise<PaginatedResponse<Booking>> => {
      await delay(500);
      let filtered = [...bookings];
      
      if (filters?.status) {
        filtered = filtered.filter(b => b.status === filters.status);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(b => 
          b.customerName.toLowerCase().includes(search) ||
          (b.email?.toLowerCase().includes(search)) ||
          b.serviceName.toLowerCase().includes(search)
        );
      }
      
      const page = filters?.page || 1;
      const limit = filters?.limit || 10;
      const start = (page - 1) * limit;
      const paginatedData = filtered.slice(start, start + limit);
      
      return {
        data: paginatedData,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      };
    },
    getById: async (id: string): Promise<Booking> => {
      await delay(300);
      const booking = bookings.find(b => b._id === id);
      if (!booking) throw new Error('Booking not found');
      return booking;
    },
    updateStatus: async (id: string, status: BookingStatus): Promise<Booking> => {
      await delay(400);
      const index = bookings.findIndex(b => b._id === id);
      if (index === -1) throw new Error('Booking not found');
      bookings[index] = { ...bookings[index], status };
      return bookings[index];
    },
    addNote: async (id: string, note: string): Promise<Booking> => {
      await delay(300);
      const index = bookings.findIndex(b => b._id === id);
      if (index === -1) throw new Error('Booking not found');
      bookings[index] = { ...bookings[index], notes: note };
      return bookings[index];
    },
  },

  // Tours
  tours: {
    getAll: async (): Promise<Tour[]> => {
      await delay(500);
      return tours;
    },
    getById: async (id: string): Promise<Tour> => {
      await delay(300);
      const tour = tours.find(t => t._id === id);
      if (!tour) throw new Error('Tour not found');
      return tour;
    },
    create: async (data: TourFormData): Promise<Tour> => {
      await delay(600);
      const newTour: Tour = {
        ...data,
        _id: generateId(),
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tours.push(newTour);
      return newTour;
    },
    update: async (id: string, data: Partial<TourFormData>): Promise<Tour> => {
      await delay(500);
      const index = tours.findIndex(t => t._id === id);
      if (index === -1) throw new Error('Tour not found');
      tours[index] = { 
        ...tours[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return tours[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = tours.findIndex(t => t._id === id);
      if (index === -1) throw new Error('Tour not found');
      tours.splice(index, 1);
    },
    toggleActive: async (id: string, isActive: boolean): Promise<Tour> => {
      await delay(300);
      const index = tours.findIndex(t => t._id === id);
      if (index === -1) throw new Error('Tour not found');
      tours[index] = { ...tours[index], isActive };
      return tours[index];
    },
    toggleFeatured: async (id: string, isFeatured: boolean): Promise<Tour> => {
      await delay(300);
      const index = tours.findIndex(t => t._id === id);
      if (index === -1) throw new Error('Tour not found');
      tours[index] = { ...tours[index], isFeatured };
      return tours[index];
    },
  },

  // Fleet
  fleet: {
    getAll: async (): Promise<Vehicle[]> => {
      await delay(500);
      return vehicles;
    },
    getById: async (id: string): Promise<Vehicle> => {
      await delay(300);
      const vehicle = vehicles.find(v => v._id === id);
      if (!vehicle) throw new Error('Vehicle not found');
      return vehicle;
    },
    create: async (data: VehicleFormData): Promise<Vehicle> => {
      await delay(600);
      const newVehicle: Vehicle = {
        ...data,
        _id: generateId(),
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      vehicles.push(newVehicle);
      return newVehicle;
    },
    update: async (id: string, data: Partial<VehicleFormData>): Promise<Vehicle> => {
      await delay(500);
      const index = vehicles.findIndex(v => v._id === id);
      if (index === -1) throw new Error('Vehicle not found');
      vehicles[index] = { 
        ...vehicles[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return vehicles[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = vehicles.findIndex(v => v._id === id);
      if (index === -1) throw new Error('Vehicle not found');
      vehicles.splice(index, 1);
    },
    toggleAvailability: async (id: string, isAvailable: boolean): Promise<Vehicle> => {
      await delay(300);
      const index = vehicles.findIndex(v => v._id === id);
      if (index === -1) throw new Error('Vehicle not found');
      vehicles[index] = { ...vehicles[index], isAvailable };
      return vehicles[index];
    },
  },

  // Services
  services: {
    getAll: async (): Promise<Service[]> => {
      await delay(500);
      return services;
    },
    getById: async (id: string): Promise<Service> => {
      await delay(300);
      const service = services.find(s => s._id === id);
      if (!service) throw new Error('Service not found');
      return service;
    },
    create: async (data: ServiceFormData): Promise<Service> => {
      await delay(600);
      const newService: Service = {
        ...data,
        _id: generateId(),
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      services.push(newService);
      return newService;
    },
    update: async (id: string, data: Partial<ServiceFormData>): Promise<Service> => {
      await delay(500);
      const index = services.findIndex(s => s._id === id);
      if (index === -1) throw new Error('Service not found');
      services[index] = { 
        ...services[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return services[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = services.findIndex(s => s._id === id);
      if (index === -1) throw new Error('Service not found');
      services.splice(index, 1);
    },
    toggleActive: async (id: string, isActive: boolean): Promise<Service> => {
      await delay(300);
      const index = services.findIndex(s => s._id === id);
      if (index === -1) throw new Error('Service not found');
      services[index] = { ...services[index], isActive };
      return services[index];
    },
  },

  // Profile
  profile: {
    get: async () => {
      await delay(400);
      return mockAdminUser;
    },
    update: async (data: { name: string; email: string }) => {
      await delay(500);
      return { ...mockAdminUser, ...data };
    },
    changePassword: async () => {
      await delay(600);
      return { message: 'Password changed successfully' };
    },
  },

  // Upload
  upload: async (file: File) => {
    await delay(800);
    return {
      url: URL.createObjectURL(file),
      filename: file.name,
      size: file.size,
      mimetype: file.type,
    };
  },

  // Reset mock data (useful for testing)
  reset: () => {
    bookings = [...mockBookings];
    tours = [...mockTours];
    vehicles = [...mockVehicles];
    services = [...mockServices];
  },
};

// Configuration to toggle between mock and real API
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_API_URL;
