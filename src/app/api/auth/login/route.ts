import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { LoginRequest, AuthResponse } from '@/types/auth';

const SANAD_API_BASE_URL = process.env.SANAD_API_BASE_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const credentials: LoginRequest = await req.json();
    
    // Validate input
    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Forward login request to FastAPI backend
    const response = await fetch(`${SANAD_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Login failed' }));
      return NextResponse.json(
        { error: errorData.error || errorData.detail || 'Invalid credentials' },
        { status: response.status }
      );
    }

    const data: AuthResponse = await response.json();
    
    // Set secure HTTP-only cookies
    const cookieStore = await cookies();
    
    cookieStore.set('sc_access', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: data.expires_in,
    });
    
    cookieStore.set('sc_refresh', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: data.expires_in * 4, // Refresh token typically lasts longer
    });

    // Return user data (don't include tokens in response)
    return NextResponse.json({
      user: data.user,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
