import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, AdminUser } from '@/lib/api/client';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isMockMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'mock_admin_user';
const MOCK_TOKEN_KEY = 'mock_admin_token';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useMock, setUseMock] = useState(USE_MOCK_API);

  useEffect(() => {
    // Check for existing session
    if (useMock) {
      const storedUser = localStorage.getItem(MOCK_USER_KEY);
      const storedToken = localStorage.getItem(MOCK_TOKEN_KEY);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      const storedUser = apiClient.getCurrentUser();
      if (storedUser && apiClient.isAuthenticated()) {
        setUser(storedUser);
      }
    }
    setIsLoading(false);
  }, [useMock]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Try real API first if not explicitly using mock
      if (!USE_MOCK_API) {
        try {
          const response = await apiClient.login(email, password);
          setUser(response.user);
          setUseMock(false);
          return { success: true };
        } catch (apiError) {
          // If real API fails with network error, fall back to mock
          const errorMessage = apiError instanceof Error ? apiError.message : '';
          if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed')) {
            console.log('Backend unavailable, using mock API');
          } else {
            // Real auth error from backend
            return { success: false, error: errorMessage };
          }
        }
      }
      
      // Use mock API
      const response = await mockApiService.auth.login(email, password);
      localStorage.setItem(MOCK_TOKEN_KEY, response.token);
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(response.user));
      setUser(response.user as AdminUser);
      setUseMock(true);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      if (useMock) {
        await mockApiService.auth.logout();
        localStorage.removeItem(MOCK_TOKEN_KEY);
        localStorage.removeItem(MOCK_USER_KEY);
      } else {
        await apiClient.logout();
      }
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = useMock 
    ? !!user && !!localStorage.getItem(MOCK_TOKEN_KEY)
    : !!user && apiClient.isAuthenticated();

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isMockMode: useMock,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
