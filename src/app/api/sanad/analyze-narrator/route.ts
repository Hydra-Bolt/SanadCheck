import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { AnalyzeNarratorRequest, NarratorAnalysisResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeNarratorRequest = await req.json();
    
    // Validate input
    if (!body.narrator_name || typeof body.narrator_name !== 'string') {
      return NextResponse.json(
        { error: 'narrator_name is required and must be a string' },
        { status: 400 }
      );
    }

    // Use authenticated API client to call backend
    const data = await apiClient.post<NarratorAnalysisResponse>(
      '/api/v1/analyze-narrator',
      body
    );
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Analyze narrator error:', error);
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to analyze narrator' },
      { status: error.status_code || 500 }
    );
  }
}
