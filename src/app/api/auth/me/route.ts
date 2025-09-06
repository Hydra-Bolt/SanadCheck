import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { User } from '@/types/auth';

export async function GET() {
  try {
    const user = await apiClient.get<User>('/auth/me');
    
    return NextResponse.json({
      user,
    });

  } catch (error: any) {
    console.error('Get user profile error:', error);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}
