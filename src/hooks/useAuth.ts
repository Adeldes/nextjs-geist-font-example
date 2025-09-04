'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, LoginData, ApiResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data: ApiResponse<User> = await response.json();
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          localStorage.removeItem('auth_token');
        }
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse<{ user: User; token: string }> = await response.json();

      if (data.success && data.data) {
        localStorage.setItem('auth_token', data.data.token);
        setUser(data.data.user);
        
        // Log the login action
        await logAuditAction('login', 'users', data.data.user.id, {
          email: data.data.user.email,
          role: data.data.user.role
        });
        
        return true;
      } else {
        console.error('Login failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        // Log the logout action
        await logAuditAction('logout', 'users', user.id, {
          email: user.email
        });
      }

      localStorage.removeItem('auth_token');
      setUser(null);
      
      // Call logout endpoint to invalidate token on server
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const logAuditAction = async (actionType: string, tableName: string, recordId: number, data: any) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      await fetch('/api/audit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          actionType,
          tableName,
          recordId,
          newValues: data,
          description: `User ${actionType}: ${data.email}`
        })
      });
    } catch (error) {
      console.error('Audit logging failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom hook for protected routes
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/login';
    }
  }, [user, isLoading]);

  return { user, isLoading };
}

// Custom hook for role-based access
export function useRequireRole(requiredRole: User['role'] | User['role'][]) {
  const { user, isLoading } = useAuth();
  
  const hasRequiredRole = () => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  useEffect(() => {
    if (!isLoading && (!user || !hasRequiredRole())) {
      window.location.href = '/unauthorized';
    }
  }, [user, isLoading, requiredRole]);

  return { user, isLoading, hasAccess: hasRequiredRole() };
}

// Utility function to get auth headers
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Utility function for authenticated API calls
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // If unauthorized, redirect to login
  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }

  return response;
}
