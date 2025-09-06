import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { UserAnalysis } from '@/types/auth';

export async function GET() {
  try {
    // Use authenticated API client to call backend
    const data = await apiClient.get<UserAnalysis[]>('/api/v1/user/analyses');
    
    return NextResponse.json({
      analyses: data,
    });

  } catch (error: any) {
    console.error('Get user analyses error:', error);
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to get user analyses' },
      { status: error.status_code || 500 }
    );
  }
}
