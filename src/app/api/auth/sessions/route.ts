import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { SessionsResponse } from '@/types/auth';

export async function GET() {
  try {
    const sessionsData = await apiClient.get<SessionsResponse>('/auth/sessions');
    
    return NextResponse.json(sessionsData);

  } catch (error: any) {
    console.error('Get user sessions error:', error);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to get user sessions' },
      { status: 500 }
    );
  }
}
