import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiService from '../services/api';

interface Admin {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
}

interface AdminContextType {
  admin: Admin | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const savedToken = localStorage.getItem('adminToken');
    const savedAdmin = localStorage.getItem('adminData');
    
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiService.adminLogin({ username, password });
      setAdmin(response.admin);
      setToken(response.token);
      
      // Save to localStorage
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminData', JSON.stringify(response.admin));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  const isAuthenticated = !!admin && !!token;

  return (
    <AdminContext.Provider value={{ admin, token, login, logout, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  );
};
