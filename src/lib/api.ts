export type {
  ExtractNarratorsRequest,
  ExtractNarratorsResponse,
  AnalyzeNarratorRequest,
  NarratorAnalysisResponse as AnalyzeNarratorResponse,
  ChainAnalysisRequest as AnalyzeNarratorChainRequest,
  ChainAnalysisResponse as AnalyzeNarratorChainResponse,
} from '@/types/auth'

import type {
  ExtractNarratorsResponse,
  NarratorAnalysisResponse,
  ChainAnalysisResponse,
} from '@/types/auth'

export async function extractNarrators(hadithText: string): Promise<ExtractNarratorsResponse> {
  const response = await fetch('/api/sanad/extract-narrators', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hadith_text: hadithText }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || `Failed to extract narrators: ${response.statusText}`)
  }

  return response.json()
}

export async function analyzeNarrator(narratorName: string): Promise<NarratorAnalysisResponse> {
  const response = await fetch('/api/sanad/analyze-narrator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ narrator_name: narratorName }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || `Failed to analyze narrator: ${response.statusText}`)
  }

  return response.json()
}

export async function analyzeNarratorChain(chain: string[]): Promise<ChainAnalysisResponse> {
  const response = await fetch('/api/sanad/analyze-chain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sanad_chain: chain }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || `Failed to analyze narrator chain: ${response.statusText}`)
  }

  return response.json()
}
