import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SANAD_API_BASE_URL = process.env.SANAD_API_BASE_URL || 'http://localhost:8000';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sc_access')?.value;
    
    // Call backend logout endpoint if we have an access token
    if (accessToken) {
      try {
        await fetch(`${SANAD_API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        // Ignore backend logout errors, still clear cookies
        console.warn('Backend logout failed:', error);
      }
    }
    
    // Clear auth cookies regardless of backend response
    cookieStore.delete('sc_access');
    cookieStore.delete('sc_refresh');

    return NextResponse.json({
      message: 'Logged out successfully',
    });

  } catch (error) {
    console.error('Logout error:', error);
    // Still try to clear cookies even on error
    const cookieStore = await cookies();
    cookieStore.delete('sc_access');
    cookieStore.delete('sc_refresh');
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
