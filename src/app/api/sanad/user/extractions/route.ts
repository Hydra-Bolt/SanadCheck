import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { UserExtraction } from '@/types/auth';

export async function GET() {
  try {
    // Use authenticated API client to call backend
    const data = await apiClient.get<UserExtraction[]>('/api/v1/user/extractions');
    
    return NextResponse.json({
      extractions: data,
    });

  } catch (error: any) {
    console.error('Get user extractions error:', error);
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to get user extractions' },
      { status: error.status_code || 500 }
    );
  }
}
