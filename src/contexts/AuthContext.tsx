'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserSession } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  sessions: UserSession[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { email: string; username: string; password: string; full_name: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshSessions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Fetch user profile
  const refreshUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  // Fetch user sessions
  const refreshSessions = async () => {
    try {
      const response = await fetch('/api/auth/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setSessions([]);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        await refreshSessions(); // Refresh sessions after login
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  // Register function
  const register = async (userData: { email: string; username: string; password: string; full_name: string }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        await refreshSessions(); // Refresh sessions after registration
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setSessions([]);
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      if (user) {
        await refreshSessions();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Refresh sessions when user changes
  useEffect(() => {
    if (user) {
      refreshSessions();
    } else {
      setSessions([]);
    }
  }, [user]);

  const value = {
    user,
    sessions,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    refreshSessions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
