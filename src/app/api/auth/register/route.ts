import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RegisterRequest, AuthResponse } from '@/types/auth';

const SANAD_API_BASE_URL = process.env.SANAD_API_BASE_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const userData: RegisterRequest = await req.json();
    
    // Validate input
    if (!userData.email || !userData.password || !userData.username || !userData.full_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Forward registration request to FastAPI backend
    const response = await fetch(`${SANAD_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Registration failed' }));
      return NextResponse.json(
        { error: errorData.error || errorData.detail || 'Registration failed' },
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
      maxAge: data.expires_in * 4,
    });

    // Return user data (don't include tokens in response)
    return NextResponse.json({
      user: data.user,
      message: 'Registration successful',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
