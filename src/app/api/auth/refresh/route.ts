import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SANAD_API_BASE_URL = process.env.SANAD_API_BASE_URL || 'http://localhost:8000';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('sc_refresh')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found' },
        { status: 401 }
      );
    }

    // Forward refresh request to FastAPI backend
    const response = await fetch(`${SANAD_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      // Clear invalid refresh token
      cookieStore.delete('sc_access');
      cookieStore.delete('sc_refresh');
      
      return NextResponse.json(
        { error: 'Token refresh failed' },
        { status: 401 }
      );
    }

    const data = await response.json();
    
    // Set new tokens in cookies
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

    return NextResponse.json({
      message: 'Tokens refreshed successfully',
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
