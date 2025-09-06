import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/apiClient';
import { ExtractNarratorsRequest, ExtractNarratorsResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: ExtractNarratorsRequest = await req.json();
    
    // Validate input
    if (!body.hadith_text || typeof body.hadith_text !== 'string') {
      return NextResponse.json(
        { error: 'hadith_text is required and must be a string' },
        { status: 400 }
      );
    }

    // Use authenticated API client to call backend
    const data = await apiClient.post<ExtractNarratorsResponse>(
      '/api/v1/extract-narrators',
      body
    );
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Extract narrators error:', error);
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to extract narrators' },
      { status: error.status_code || 500 }
    );
  }
}
