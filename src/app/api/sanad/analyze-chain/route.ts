import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { ChainAnalysisRequest, ChainAnalysisResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: ChainAnalysisRequest = await req.json();
    
    // Validate input
    if (!body.sanad_chain || !Array.isArray(body.sanad_chain)) {
      return NextResponse.json(
        { error: 'sanad_chain is required and must be an array' },
        { status: 400 }
      );
    }

    // Use authenticated API client to call backend
    const data = await apiClient.post<ChainAnalysisResponse>(
      '/api/v1/analyze-narrator-chain',
      body
    );
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Analyze chain error:', error);
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to analyze chain' },
      { status: error.status_code || 500 }
    );
  }
}
