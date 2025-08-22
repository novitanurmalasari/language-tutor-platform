import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService from '../services/api';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Try to get stored user data from localStorage
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          apiService.setAuthToken(token);
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          logout();
        }
      } else {
        // If no stored user data, try to fetch from backend
        apiService.setAuthToken(token);
        fetchUserData();
      }
    }
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      // Try to get user data from backend
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    } catch (error) {
      // If fetching user data fails, just log the error
      // Don't logout immediately as the token might still be valid
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await apiService.login(username, password);
    
    // Handle the actual backend response structure
    const token = response.accessToken;
    const user = {
      id: response.username, // Using username as ID since backend doesn't provide ID
      username: response.username,
      email: response.email,
      role: response.role
    };
    
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    apiService.setAuthToken(token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    apiService.setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};