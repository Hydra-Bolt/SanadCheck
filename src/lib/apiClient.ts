import { cookies } from 'next/headers';
import { ApiError } from '@/types/auth';

const BASE_URL = process.env.SANAD_API_BASE_URL || 'http://localhost:8000';

// Token management utilities
export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get('sc_access')?.value || null;
}

export async function getRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get('sc_refresh')?.value || null;
}

export async function setAuthCookies(accessToken: string, refreshToken: string, expiresIn: number) {
  const store = await cookies();
  
  store.set('sc_access', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: expiresIn, // Use backend provided expiry
  });
  
  store.set('sc_refresh', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: expiresIn * 4, // Refresh token typically lasts longer
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete('sc_access');
  store.delete('sc_refresh');
}

// Check if access token is expired (basic check without decoding JWT)
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp - 60000; // Refresh if less than 1 minute left
  } catch {
    return true; // If we can't decode, assume expired
  }
}

// Internal function to refresh tokens
async function refreshTokens(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      clearAuthCookies();
      return null;
    }

    const data = await response.json();
    await setAuthCookies(data.access_token, data.refresh_token, data.expires_in);
    return data.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    await clearAuthCookies();
    return null;
  }
}

// Get valid access token (refresh if needed)
async function getValidAccessToken(): Promise<string | null> {
  let accessToken = await getAccessToken();
  
  if (!accessToken) {
    // Try to refresh
    accessToken = await refreshTokens();
  } else if (isTokenExpired(accessToken)) {
    // Token is expired, refresh
    accessToken = await refreshTokens();
  }
  
  return accessToken;
}

// Main API client function
export async function sanadFetch<T>(
  path: string, 
  init: RequestInit = {}
): Promise<T> {
  const token = await getValidAccessToken();
  const headers = new Headers(init.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store', // Disable caching for auth requests
  });

  // Handle unauthorized (token issues)
  if (response.status === 401) {
    // Try one more time with token refresh
    const newToken = await refreshTokens();
    if (newToken && !headers.get('Authorization')?.includes(newToken)) {
      headers.set('Authorization', `Bearer ${newToken}`);
      const retryResponse = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers,
        cache: 'no-store',
      });
      
      if (retryResponse.ok) {
        return retryResponse.json() as Promise<T>;
      }
    }
    
    // If refresh failed or retry failed, clear tokens
    await clearAuthCookies();
    throw new Error('Authentication failed. Please log in again.');
  }

  // Handle other errors
  if (!response.ok) {
    let errorMessage = `API error ${response.status}`;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.detail || errorMessage;
    } catch {
      errorMessage = await response.text() || errorMessage;
    }
    
    const error = new Error(errorMessage) as ApiError & Error;
    error.status_code = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
}

// Convenience methods for different HTTP methods
export const apiClient = {
  get: <T>(path: string, init?: Omit<RequestInit, 'method'>) =>
    sanadFetch<T>(path, { ...init, method: 'GET' }),

  post: <T>(path: string, data?: any, init?: Omit<RequestInit, 'method' | 'body'>) =>
    sanadFetch<T>(path, {
      ...init,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(path: string, data?: any, init?: Omit<RequestInit, 'method' | 'body'>) =>
    sanadFetch<T>(path, {
      ...init,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(path: string, init?: Omit<RequestInit, 'method'>) =>
    sanadFetch<T>(path, { ...init, method: 'DELETE' }),
};
